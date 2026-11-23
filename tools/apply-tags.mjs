import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
export function run(apply) {
  const stats = { ok: 0, skip: 0, fail: [] }
  for (let i = 1; i <= 2; i++) {
    const list = JSON.parse(fs.readFileSync(path.join(root, "tools", "tags", "slice-" + i + ".json"), "utf8"))
    for (const e of list) {
      const p = path.join(root, e.file)
      try {
        const txt = fs.readFileSync(p, "utf8")
        const parts = txt.split("+++")
        if (parts.length < 3) { stats.skip++; continue }
        const fm = parts[1]
        const existing = fm.match(/\[taxonomies\][\s\S]*?tags\s*=\s*\[([\s\S]*?)\]/)
        if (existing && existing[1].trim()) { stats.skip++; continue }
        const line = "tags = [" + e.tags.map((t) => JSON.stringify(t)).join(", ") + "]"
        let newFm
        if (/\[taxonomies\]/.test(fm)) {
          if (existing) newFm = fm.replace(existing[0], existing[0].replace(/tags\s*=\s*\[[\s\S]*?\]/, line))
          else newFm = fm.replace(/\[taxonomies\]/, "[taxonomies]\n" + line)
        } else newFm = fm.replace(/\s*$/, "\n[taxonomies]\n" + line + "\n")
        if (apply) fs.writeFileSync(p, txt.replace(fm, newFm), "utf8")
        stats.ok++
      } catch (err) { stats.fail.push(e.file + ": " + err.message) }
    }
  }
  return stats
}
