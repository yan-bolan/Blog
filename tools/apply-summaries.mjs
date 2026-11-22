// apply-summaries.mjs — 把 tools/summaries/slice-N.json 的摘要插入文章 TOML frontmatter 顶层
// 用法: node tools/apply-summaries.mjs   （需能写穿 content junction 的权限）
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = "D:/博客/YuriBlog";
const stats = { ok: 0, skip: 0, fail: [] };
for (let i = 1; i <= 4; i++) {
  const jp = join(root, "tools/summaries", "slice-" + i + ".json");
  if (!existsSync(jp)) { stats.fail.push({ file: jp, why: "json missing" }); continue; }
  const list = JSON.parse(readFileSync(jp, "utf8"));
  for (const { file, description } of list) {
    const p = join(root, file);
    if (file.endsWith("/_index.md")) { stats.skip++; continue; }
    try {
      if (!existsSync(p)) { stats.fail.push({ file, why: "post missing" }); continue; }
      const desc = String(description ?? "").trim();
      if (!desc || Array.from(desc).length > 80 || /["\\]/.test(desc)) { stats.fail.push({ file, why: "bad desc: " + desc.slice(0, 30) }); continue; }
      const text = readFileSync(p, "utf8");
      const eol = text.includes("\r\n") ? "\r\n" : "\n";
      const m = text.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+/);
      if (!m) { stats.fail.push({ file, why: "no frontmatter" }); continue; }
      const block = m[1];
      if (/^description\s*=/m.test(block)) { stats.skip++; continue; }
      const lines = block.split(/\r?\n/);
      let at = lines.findIndex((l) => l.trim().startsWith("["));
      if (at === -1) at = lines.length;
      lines.splice(at, 0, 'description = "' + desc + '"');
      const out = text.slice(0, m.index) + "+++" + eol + lines.join(eol) + eol + "+++" + text.slice(m.index + m[0].length);
      writeFileSync(p, out, "utf8");
      stats.ok++;
    } catch (e) { stats.fail.push({ file, why: String(e.message).slice(0, 80) }); }
  }
}
console.log(JSON.stringify(stats, null, 1));
