import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dir = path.join(root, "content", "posts")
const EXPLICIT = new Map(Object.entries({
  "安卓": "android", "csharp": "c#", "csahrp": "c#", "andriod": "android",
  "clash dashboard": "clash", "xdebug调试": "xdebug", "phpstorm调试": "phpstorm",
  "端口冲突": "端口占用", "函数闭包": "闭包", "插槽：": "插槽", "vue slot": "slot",
  "dokcerfile": "dockerfile", "ssｈ": "ssh", "Progouard": "proguard",
  ".htacesss": ".htaccess", "vmare ip": "vmware", "vmtools灰色": "vmware",
}))
const isAscii = (s) => /^[\x20-\x7e]+$/.test(s)
export function mapTag(t) {
  let x = t.trim()
  if (EXPLICIT.has(x)) x = EXPLICIT.get(x)
  else if (EXPLICIT.has(x.toLowerCase())) x = EXPLICIT.get(x.toLowerCase())
  if (isAscii(x)) x = x.toLowerCase()
  return x
}
export function run(apply) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "_index.md")
  const before = new Map(), after = new Map()
  let changed = 0, dedup = 0
  const changes = []
  for (const f of files) {
    const p = path.join(dir, f)
    const txt = fs.readFileSync(p, "utf8")
    const parts = txt.split("+++")
    if (parts.length < 3) continue
    const fm = parts[1]
    const tm = fm.match(/(\[taxonomies\][\s\S]*?)(tags\s*=\s*\[)([\s\S]*?)(\])/)
    if (!tm) continue
    const old = tm[3].split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean)
    if (!old.length) continue
    for (const t of old) before.set(t, (before.get(t) ?? 0) + 1)
    const mapped = old.map(mapTag)
    const seen = new Set(); const neu = []
    for (const t of mapped) { if (seen.has(t)) { dedup++; continue } seen.add(t); neu.push(t) }
    for (const t of neu) after.set(t, (after.get(t) ?? 0) + 1)
    if (JSON.stringify(neu) !== JSON.stringify(old)) {
      changed++
      changes.push({ file: f, old, neu })
      if (apply) {
        const newFm = fm.replace(tm[0], tm[1] + tm[2] + neu.map((t) => JSON.stringify(t)).join(", ") + tm[4])
        fs.writeFileSync(p, txt.replace(fm, newFm), "utf8")
      }
    }
  }
  return { apply, posts: files.length, changed, dedup, uniqueBefore: before.size, uniqueAfter: after.size, changes: apply ? undefined : changes }
}
