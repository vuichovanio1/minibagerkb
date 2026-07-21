/**
 * Rebuild minified CSS from source.
 * Run: node build-css.js
 */
const fs = require("fs");

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

let site = fs.readFileSync("assets/css/site.css", "utf8");
if (/@import/.test(site)) {
  site = site.replace(/@import\s+url\(["']?fonts\.css["']?\);\s*/i, "");
  fs.writeFileSync("assets/css/site.css", site);
}
const fonts = fs.readFileSync("assets/css/fonts.css", "utf8");
const critical = fs.readFileSync("assets/css/critical.css", "utf8");

fs.writeFileSync("assets/css/site.min.css", minifyCss(site));
fs.writeFileSync("assets/css/fonts.min.css", minifyCss(fonts));
// critical.css is already minified single-line from generator; keep as-is for HTML injects
console.log("rebuilt site.min.css + fonts.min.css");
console.log("critical.css bytes:", critical.length);
