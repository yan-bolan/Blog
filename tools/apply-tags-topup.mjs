import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
export function run(apply, n) {
  const stats = { ok: 0, skip: 0, fail: [] }
  for (let i = 1; i <= n; i++) {
    const list = JSON.parse(fs.readFileSync(path.join(root, "tools", "tags", "topup-slice-" + i + ".json"), "utf8"))
    for (const e of list) {
      const p = path.join(root, e.file)
      try {
        const txt = fs.readFileSync(p, "utf8")
        const parts = txt.split("+++")
        const fm = parts[1]
        const m = fm.match(/\[taxonomies\][\s\S]*?tags\s*=\s*\[([\s\S]*?)\]/)
        if (!m) { stats.fail.push(e.file + ": no tags array"); continue }
        const line = "tags = [" + e.tags.map((t) => JSON.stringify(t)).join(", ") + "]"
        const newFm = fm.replace(m[0], m[0].replace(/tags\s*=\s*\[[\s\S]*?\]/, line))
        if (newFm === fm) { stats.skip++; continue }
        if (apply) fs.writeFileSync(p, txt.replace(fm, newFm), "utf8")
        stats.ok++
      } catch (err) { stats.fail.push(e.file + ": " + err.message) }
    }
  }
  return stats
}
