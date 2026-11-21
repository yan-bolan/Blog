// Hexo -> Zola 文章迁移脚本（烟波蓝日志）
// 用法: node scripts/migrate.mjs   （在 yanbolanblog 目录下运行）
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
const require = createRequire(import.meta.url);
const yaml = require("./vendor/node_modules/js-yaml"); // 已内置于 scripts/vendor，可独立运行

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "source", "_posts");
const OUT = path.join(ROOT, "content", "posts");

const tomlStr = (v) => JSON.stringify(String(v));
const pad = (n) => String(n).padStart(2, "0");
const fmtLocal = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());

function normDate(v) {
  if (v == null) return null;
  if (v instanceof Date) {
    return v.getUTCFullYear() + "-" + pad(v.getUTCMonth() + 1) + "-" + pad(v.getUTCDate()) + " " +
      pad(v.getUTCHours()) + ":" + pad(v.getUTCMinutes()) + ":" + pad(v.getUTCSeconds());
  }
  const s = String(v).trim();
  return s || null;
}
function asList(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v.flat(Infinity).filter((x) => x != null).map(String);
  return [String(v)];
}

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

const files = (await walk(SRC)).sort();
const mdFiles = files.filter((f) => f.toLowerCase().endsWith(".md"));
const otherFiles = files.filter((f) => !f.toLowerCase().endsWith(".md"));
await fs.mkdir(OUT, { recursive: true });
// 清理上次输出（保留 _index.md）
for (const e of await fs.readdir(OUT)) {
  if (e.toLowerCase().endsWith(".md") && e !== "_index.md") await fs.unlink(path.join(OUT, e));
}

const report = { total: mdFiles.length, ok: 0, errors: [], fallbacks: [], noAbbrlink: [], collisions: [], music: [], unknownKeys: {}, bodyAnomalies: [], minDate: null, maxDate: null, withCover: 0, withCategories: 0, withTags: 0, withUpdated: 0 };
const usedNames = new Map();
const seenHash = new Map();
const seenAbbr = new Map();
report.dedup = [];
report.abbrlinkDupes = [];

for (const file of mdFiles) {
  const rel = path.relative(SRC, file);
  try {
    let raw = await fs.readFile(file, "utf8");
    if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
    const hash = createHash("sha1").update(raw).digest("hex");
    if (seenHash.has(hash)) { report.dedup.push({ rel, sameAs: seenHash.get(hash) }); continue; }
    seenHash.set(hash, rel);
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    let fm = {}, body = raw;
    if (m) { fm = yaml.load(m[1]) || {}; body = raw.slice(m[0].length); }

    const known = new Set(["title", "date", "updated", "tags", "categories", "abbrlink", "cover", "url", "layout", "comments", "toc", "photos", "keywords", "description", "author", "lang", "permalink", "mathjax", "katex"]);
    for (const k of Object.keys(fm)) if (!known.has(k)) report.unknownKeys[k] = (report.unknownKeys[k] || 0) + 1;

    body = body.replace(/\[music:(\d+)\]/g, (whole, id) => {
      const has = body.includes("id=" + id) && body.includes("music.163.com/outchain/player");
      report.music.push({ rel, id, action: has ? "removed-duplicate" : "replaced-iframe" });
      return has ? "" : '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=' + id + '&auto=0&height=66"></iframe>';
    });

    const anom = body.match(/\{%[\s\S]{0,60}?%\}|\{\{[\s\S]{0,60}?\}\}/g);
    if (anom) report.bodyAnomalies.push({ rel, samples: anom.slice(0, 3) });

    // 标题：front matter > 正文首个 H1 > 文件名
    let title = fm.title != null ? String(fm.title) : null;
    if (!title) {
      const h1 = body.match(/^#\s+(.+)$/m);
      title = h1 ? h1[1].trim() : path.basename(file, ".md");
    }
    // 日期：front matter > 文件修改时间（兜底）
    let date = normDate(fm.date);
    if (!date) {
      const st = await fs.stat(file);
      date = fmtLocal(st.mtime);
      report.fallbacks.push({ rel, reason: m ? "missing date" : "no front matter", date, title });
    }
    const updated = normDate(fm.updated);
    let abbrlink = fm.abbrlink != null ? String(fm.abbrlink).trim() : null;
    if (abbrlink === "0" || abbrlink === "") abbrlink = null; // 占位值视为未生成
    const tags = asList(fm.tags);
    const cats = asList(fm.categories);
    const cover = fm.cover != null ? String(fm.cover) : null;

    if (!report.minDate || date < report.minDate) report.minDate = date;
    if (!report.maxDate || date > report.maxDate) report.maxDate = date;
    if (cover) report.withCover++;
    if (cats.length) report.withCategories++;
    if (tags.length) report.withTags++;
    if (updated) report.withUpdated++;

    let slug = abbrlink;
    const aliases = [];
    if (abbrlink) {
      const n = (seenAbbr.get(abbrlink) || 0) + 1;
      seenAbbr.set(abbrlink, n);
      if (n > 1) {
        slug = abbrlink + "-" + n;
        report.abbrlinkDupes.push({ rel, abbrlink, newSlug: slug });
      } else {
        const dm = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (dm) aliases.push("/" + dm[1] + "/" + dm[2] + "_" + dm[3] + "_" + abbrlink + ".html");
      }
    } else {
      slug = path.basename(file, ".md").replace(/^\.+/, "");
      report.noAbbrlink.push(rel);
    }

    let base = path.basename(file);
    if (base.startsWith(".")) base = "post-" + base; // Zola 忽略点开头文件
    if (usedNames.has(base.toLowerCase())) {
      const stem = base.replace(/\.md$/i, "");
      let n = 2;
      while (usedNames.has((stem + "-" + n + ".md").toLowerCase())) n++;
      base = stem + "-" + n + ".md";
      report.collisions.push({ rel, renamed: base });
    }
    usedNames.set(base.toLowerCase(), rel);

    const L = [];
    L.push("+++");
    L.push("title = " + tomlStr(title));
    L.push("date = " + tomlStr(date));
    if (updated) L.push("updated = " + tomlStr(updated));
    L.push("slug = " + tomlStr(slug));
    if (aliases.length) L.push("aliases = [" + aliases.map(tomlStr).join(", ") + "]");
    if (tags.length) { L.push("[taxonomies]"); L.push("tags = [" + tags.map(tomlStr).join(", ") + "]"); }
    const extra = [];
    if (cats.length) { extra.push("category = " + tomlStr(cats[0])); extra.push("categories = [" + cats.map(tomlStr).join(", ") + "]"); }
    if (cover) extra.push("cover = " + tomlStr(cover));
    if (extra.length) { L.push("[extra]"); L.push(...extra); }
    L.push("+++");
    await fs.writeFile(path.join(OUT, base), L.join("\n") + "\n" + body.replace(/^\s*\n/, ""), "utf8");
    report.ok++;
  } catch (e) {
    report.errors.push({ rel, err: String(e && e.message || e) });
  }
}
report.otherFiles = otherFiles.map((f) => path.relative(SRC, f));
console.log(JSON.stringify(report, null, 2));
