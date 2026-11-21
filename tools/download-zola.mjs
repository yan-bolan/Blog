import fs from "node:fs/promises";
const url = "https://github.com/getzola/zola/releases/download/v0.23.6/zola-v0.23.6-x86_64-pc-windows-msvc.zip";
const res = await fetch(url, { redirect: "follow" });
if (!res.ok) { console.error("HTTP " + res.status); process.exit(1); }
const buf = Buffer.from(await res.arrayBuffer());
await fs.writeFile(new URL("./zola.zip", import.meta.url), buf);
console.log("downloaded bytes:", buf.length);
