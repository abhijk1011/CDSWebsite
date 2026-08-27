#!/usr/bin/env node
/**
 * Takes whatever comes out of an image generator and makes it web ready.
 *
 * Save each file into public/live/incoming/ under its slug, in any format and
 * at any size, then:
 *
 *   npm run shots
 *
 * Each file is cropped to four by three, encoded as a progressive JPEG
 * and moved into public/live/ over the coloured stand in. A 2K PNG off a
 * generator is several megabytes; what lands here is around a hundred
 * kilobytes, which is the difference between a page that loads and a page
 * that hangs on a phone.
 *
 * Dish slugs land in public/live cropped to four by three. Charliee slugs
 * (charliee-01 through charliee-12) land in public/charliee and keep their
 * four by five frame, because that mosaic crops each slot itself.
 *
 * A name that is neither is refused rather than quietly written, because a
 * typo would otherwise leave a stand in in place and look like the script had
 * run fine.
 */
import { mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const IN = "public/live/incoming";
const OUT = "public/live";
const CHARLIEE_OUT = "public/charliee";

/**
 * The shape the home page panel crops to, and the widest we ever store.
 * Anything narrower keeps its own width: enlarging a picture invents no
 * detail, it only makes the file bigger, and this one sits behind a scrim
 * and a mask where softness never shows anyway.
 */
const MAX_W = 1400;
const ratio = 4 / 3;

/**
 * The Charliee mosaic slots. These keep their four by five shape rather than
 * being cropped to the panel, because the mosaic does its own cropping per
 * slot and needs the whole frame to choose from.
 */
const CHARLIEE = new Set(
  Array.from({ length: 12 }, (_, i) => `charliee-${String(i + 1).padStart(2, "0")}`),
);

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
mkdirSync(CHARLIEE_OUT, { recursive: true });

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
  const isCharliee = CHARLIEE.has(slug);
  if (!isCharliee && !SLUGS.has(slug)) {
    unknown.push(file);
    continue;
  }
  const target = join(isCharliee ? CHARLIEE_OUT : OUT, `${slug}.jpg`);
  const source = sharp(join(IN, file));
  const { width } = await source.metadata();
  const w = Math.min(width || MAX_W, MAX_W);
  // Charliee keeps its portrait frame; the mosaic crops each slot itself.
  const h = Math.round(isCharliee ? (w * 5) / 4 : w / ratio);
  await source
    .resize(w, h, { fit: "cover", position: "attention" })
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
