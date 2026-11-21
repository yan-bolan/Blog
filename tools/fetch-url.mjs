import fs from "node:fs/promises";
const [url, out] = process.argv.slice(2);
if (!url || !out) { console.error("usage: node fetch-url.mjs <url> <outfile>"); process.exit(2); }
const res = await fetch(url, { redirect: "follow" });
if (!res.ok) { console.error("HTTP " + res.status); process.exit(1); }
const buf = Buffer.from(await res.arrayBuffer());
await fs.writeFile(out, buf);
console.log("downloaded", out, buf.length, "bytes");
