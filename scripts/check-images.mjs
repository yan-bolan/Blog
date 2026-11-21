// 扫描全站文章外链图片可用性: node scripts/check-images.mjs
import fs from "node:fs/promises";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "content", "posts");
const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".md") && f !== "_index.md");
const map = new Map(); // url -> [posts]
for (const f of files) {
  const t = await fs.readFile(path.join(DIR, f), "utf8");
  const urls = [];
  for (const m of t.matchAll(/!\[[^\]]*\]\((https?:[^)\s]+)[^)]*\)/g)) urls.push(m[1]);
  for (const m of t.matchAll(/<img[^>]+src=["'](https?:[^"']+)["']/g)) urls.push(m[1]);
  for (const u of urls) { if (!map.has(u)) map.set(u, []); map.get(u).push(f); }
}
const entries = [...map.entries()];
console.error("unique external image urls:", entries.length);
const results = [];
let idx = 0;
async function check(u) {
  for (const attempt of [u, u.replace("cdn.jsdelivr.net", "fastly.jsdelivr.net")]) {
    try {
      const r = await fetch(attempt, { method: "HEAD", signal: AbortSignal.timeout(12000), redirect: "follow" });
      if (r.status < 400) return { status: r.status, via: attempt === u ? "original" : "fastly-mirror" };
      if (r.status === 405 || r.status === 403) {
        const g = await fetch(attempt, { method: "GET", signal: AbortSignal.timeout(15000), redirect: "follow" });
        if (g.ok) { try { await g.arrayBuffer() } catch {} return { status: g.status, via: attempt === u ? "original" : "fastly-mirror" }; }
        if (attempt === u && u.includes("cdn.jsdelivr.net")) continue;
        return { status: g.status, dead: true };
      }
      if (attempt === u && u.includes("cdn.jsdelivr.net")) continue;
      return { status: r.status, dead: true };
    } catch (e) {
      if (attempt === u && u.includes("cdn.jsdelivr.net")) continue;
      return { err: String(e.message || e), unknown: true };
    }
  }
  return { err: "unreachable", unknown: true };
}
async function worker() {
  while (idx < entries.length) {
    const i = idx++;
    const [u, posts] = entries[i];
    const r = await check(u);
    results.push({ url: u, posts, ...r });
    if (results.length % 25 === 0) console.error("checked", results.length, "/", entries.length);
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
const dead = results.filter((r) => r.dead);
const unknown = results.filter((r) => r.unknown);
const report = { total: entries.length, alive: results.length - dead.length - unknown.length, deadCount: dead.length, unknownCount: unknown.length, dead, unknown };
await fs.writeFile(path.join(ROOT, "scripts", "image-check-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ total: report.total, alive: report.alive, deadCount: report.deadCount, unknownCount: report.unknownCount, deadSample: dead.slice(0, 40).map((d) => ({ url: d.url, status: d.status, posts: d.posts.slice(0, 3) })) }, null, 1));
