import fs from "node:fs";

function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#169;/g, "©")
    .replace(/\s+/g, " ")
    .trim();
}

for (const page of [
  "case-study-saas-design-system.html",
  "case-study-micro-interaction-saas.html",
  "case-study-samayseva.html",
]) {
  const html = fs.readFileSync(`d:/Downloads/Final_porfolio/tmp-${page}`, "utf8");
  const sections = [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m) =>
    text(m[1]),
  );
  console.log("\n##", page);
  console.log("headings:", sections.slice(0, 20));
  const imgs = [...html.matchAll(/src="(\.\/assets\/[^"]+)"/g)].map((m) => m[1]);
  console.log("imgs", [...new Set(imgs)].slice(0, 15));
}

const home = fs.readFileSync("d:/Downloads/Final_porfolio/tmp-home.html", "utf8");
// project blocks
const blocks = [...home.matchAll(/<div class="details-container color-container">([\s\S]*?)<\/div>\s*<\/div>/g)];
console.log("\nblocks", blocks.length);
for (const b of blocks) {
  const t = b[1].match(/project-title">([^<]+)/)?.[1];
  const btns = [...b[1].matchAll(/onclick="([^"]+)"/g)].map((m) => m[1]);
  console.log("---", t);
  console.log(btns.join(" | "));
}
