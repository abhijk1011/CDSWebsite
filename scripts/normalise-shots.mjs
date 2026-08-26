#!/usr/bin/env node
/**
 * Takes whatever comes out of an image generator and makes it web ready.
 *
 * Save each download into public/live/incoming/ under the dish slug, in any
 * format and at any size, then:
 *
 *   npm run shots
 *
 * Each file is cropped to the panel's shape, encoded as a progressive JPEG
 * and moved into public/live/ over the coloured stand in. A 2K PNG off a
 * generator is several megabytes; what lands here is around a hundred
 * kilobytes, which is the difference between a page that loads and a page
 * that hangs on a phone.
 *
 * A name that is not a dish on the board is refused rather than quietly
 * written, because a typo would otherwise leave a stand in in place and look
 * like the script had run fine.
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const IN = "public/live/incoming";
const OUT = "public/live";

/** The shape the home page panel crops to. */
const W = 1400, H = 1050;

/** Every dish the menu currently expects a picture for. */
const SLUGS = new Set([
  "pani-puri", "masala-puri", "bhel-puri", "sev-puri", "dahi-puri",
  "samosa-chaat", "ragda-pattice",
  "burger", "cheese-burger", "peri-peri-burger",
  "veg-sandwich", "toast-sandwich", "cheese-chilli-toast",
  "veg-frankie", "veg-cheese-frankie",
  "butter-dabeli", "cheese-dabeli",
  "classic-margherita", "four-cheese", "peri-peri-pizza", "tandoori-pizza",
  "mint-mojito", "blue-lagoon-mojito", "sunset", "guava-shots",
]);

mkdirSync(IN, { recursive: true });

const files = readdirSync(IN).filter((f) =>
  /\.(png|jpe?g|webp|avif|tiff?)$/i.test(f),
);

if (files.length === 0) {
  console.log(`Nothing in ${IN}. Save your downloads there, named for the dish.`);
  process.exit(0);
}

let done = 0;
const unknown = [];

for (const file of files) {
  const slug = basename(file, extname(file)).toLowerCase();
  if (!SLUGS.has(slug)) {
    unknown.push(file);
    continue;
  }
  const target = join(OUT, `${slug}.jpg`);
  await sharp(join(IN, file))
    .resize(W, H, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(target);
  unlinkSync(join(IN, file));
  console.log(`  ${slug}`);
  done++;
}

console.log(`\nPlaced ${done} photograph${done === 1 ? "" : "s"}.`);

if (unknown.length) {
  console.error(`\nNot a dish on the board, so left alone:`);
  for (const f of unknown) console.error(`  ${f}`);
  console.error(`\nRename to one of the slugs in scripts/normalise-shots.mjs.`);
  process.exitCode = 1;
}
