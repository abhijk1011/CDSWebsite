#!/usr/bin/env node
/**
 * Builds a self contained review page for the dish photography.
 *
 * Artifacts cannot reach any host, so every photograph is inlined as a data
 * URI at review size. Each one is shown under the exact overlay the home page
 * puts on it, in the site's own Fraunces and Inter, so what gets judged here
 * is what ships rather than a bare contact sheet.
 *
 *   node scripts/make-review.mjs [outfile]
 */
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const OUT = process.argv[2] ?? "review.html";
const data = JSON.parse(readFileSync("scripts/dish-prompts.json", "utf8"));

/** Review size. Big enough to judge, small enough to stay well inside 16MB. */
const W = 1000;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const cards = [];
let bytes = 0;

for (const dish of data.dishes) {
  const buf = await sharp(`public/live/${dish.slug}.jpg`)
    .resize(W, Math.round(W * 3 / 4), { fit: "cover", position: "attention" })
    .jpeg({ quality: 76, progressive: true, mozjpeg: true })
    .toBuffer();
  bytes += buf.length;
  const section = data.sections.find((s) => s.id === dish.section);
  const brief = dish.brief + " " + (dish.kind === "drink" ? data._drink : data._food);
  cards.push({
    ...dish,
    sectionName: section.name,
    brief,
    uri: `data:image/jpeg;base64,${buf.toString("base64")}`,
  });
}

const bySection = data.sections.map((s) => ({
  ...s,
  items: cards.filter((c) => c.section === s.id),
}));

const sectionsHtml = bySection.map((s) => `
  <section class="course">
    <div class="course-head">
      <h2>${esc(s.name)}</h2>
      <p>${esc(s.kicker)}</p>
      <span class="count">${s.items.length}</span>
    </div>
    <div class="grid">
      ${s.items.map((d) => `
      <article class="shot" data-slug="${esc(d.slug)}">
        <div class="frame">
          <img src="${d.uri}" alt="${esc(d.name)}" loading="lazy" decoding="async">
          <span class="scrim" aria-hidden="true"></span>
          <div class="caption">
            <span class="eyebrow"><i></i>${esc(s.name)}</span>
            <span class="dish">${esc(d.name)}</span>
          </div>
          <button type="button" class="flag" aria-pressed="false">
            <span class="flag-on">Marked to redo</span>
            <span class="flag-off">Mark to redo</span>
          </button>
        </div>
        <div class="meta">
          <code>${esc(d.slug)}.jpg</code>
          <button type="button" class="copy-brief">Copy brief</button>
        </div>
        <details>
          <summary>Brief</summary>
          <p>${esc(d.brief)}</p>
        </details>
      </article>`).join("")}
    </div>
  </section>`).join("");

const html = readFileSync("scripts/review-template.html", "utf8")
  .replace("<!--SECTIONS-->", sectionsHtml)
  .replace("<!--TOTAL-->", String(cards.length));

writeFileSync(OUT, html);
console.log(
  `Wrote ${OUT}: ${cards.length} photographs, ` +
  `${(bytes / 1e6).toFixed(1)}MB of JPEG, ` +
  `${(Buffer.byteLength(html) / 1e6).toFixed(1)}MB of page.`,
);
