import fs from "node:fs";
import https from "node:https";
import http from "node:http";

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(new URL(res.headers.location, url).href).then(resolve, reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

const home = await get("https://adityamote.in/");
fs.writeFileSync("d:/Downloads/Final_porfolio/tmp-home.html", home);

const casePages = [...home.matchAll(/case-study-[a-z0-9-]+\.html/g)].map((m) => m[0]);
const uniqueCases = [...new Set(casePages)];
console.log("cases", uniqueCases);

const titles = [...home.matchAll(/project-title">([^<]+)/g)].map((m) => m[1]);
console.log("titles", titles);

const figma = [...home.matchAll(/https:\/\/www\.figma\.com\/design\/[^"']+/g)].map((m) =>
  m[0].replace(/&amp;/g, "&"),
);
console.log("figma", figma);

const live = [...home.matchAll(/https?:\/\/[a-z0-9.-]+[^"']*/gi)]
  .map((m) => m[0])
  .filter((u) => /ekartham|live/i.test(u) || u.includes("ekartham"));
console.log("live-ish", [...new Set(live)].slice(0, 20));

// Also grab onclick live website
const liveBtns = [...home.matchAll(/window\.open\('([^']+)'\)/g)].map((m) => m[1]);
console.log("opens", liveBtns);

for (const page of uniqueCases) {
  const url = `https://adityamote.in/${page}`;
  try {
    const html = await get(url);
    fs.writeFileSync(`d:/Downloads/Final_porfolio/tmp-${page}`, html);
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim();
    const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 40)
      .slice(0, 8);
    console.log("\n===", page, "===\n", h1);
    paras.forEach((p, i) => console.log(`P${i}:`, p.slice(0, 220)));
  } catch (e) {
    console.log("fail", page, e.message);
  }
}
