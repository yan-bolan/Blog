// SEO 主动推送（迁移自旧 HexoSeoAutoPush 工作流）
// 从 public/sitemap.xml 提取 URL，推送到 Bing / Baidu / Google Indexing API。
// 依赖环境变量：BING_APIKEY、BAIDU_TOKEN、GOOGLE_CLIENT_EMAIL、GOOGLE_PRIVATE_KEY（缺省则跳过对应引擎）。
import fs from "node:fs";
import crypto from "node:crypto";

const SITE = "https://yuris.site";
const xml = fs.readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log("sitemap urls:", urls.length);

async function pushBing() {
  const key = process.env.BING_APIKEY;
  if (!key) return console.log("bing: skipped (no BING_APIKEY)");
  for (let i = 0; i < urls.length; i += 500) {
    const batch = urls.slice(i, i + 500);
    const r = await fetch("https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=" + key, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteUrl: SITE, urlList: batch }),
    });
    console.log("bing batch", i / 500 + 1, r.status, (await r.text()).slice(0, 200));
  }
}

async function pushBaidu() {
  const token = process.env.BAIDU_TOKEN;
  if (!token) return console.log("baidu: skipped (no BAIDU_TOKEN)");
  const r = await fetch("http://data.zz.baidu.com/urls?site=" + SITE + "&token=" + token, {
    method: "POST", headers: { "Content-Type": "text/plain" }, body: urls.join("\n"),
  });
  console.log("baidu:", r.status, (await r.text()).slice(0, 300));
}

async function pushGoogle() {
  const email = process.env.GOOGLE_CLIENT_EMAIL, pk = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !pk) return console.log("google: skipped (no credentials)");
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: "RS256", typ: "JWT" });
  const claim = b64({ iss: email, scope: "https://www.googleapis.com/auth/indexing", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 });
  const sig = crypto.createSign("RSA-SHA256").update(head + "." + claim).sign(pk.replace(/\\n/g, "\n"), "base64url");
  const tr = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + head + "." + claim + "." + sig,
  });
  const tj = await tr.json();
  if (!tj.access_token) return console.log("google token failed:", JSON.stringify(tj).slice(0, 200));
  let ok = 0, fail = 0;
  for (const u of urls.slice(0, 200)) { // Google Indexing API 每日配额约 200
    const r = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tj.access_token },
      body: JSON.stringify({ url: u, type: "URL_UPDATED" }),
    });
    r.ok ? ok++ : fail++;
  }
  console.log("google: ok=" + ok + " fail=" + fail);
}

await pushBing();
await pushBaidu();
await pushGoogle();
