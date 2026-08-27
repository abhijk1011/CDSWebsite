#!/usr/bin/env node
/**
 * Pulls generated dish photography into public/live.
 *
 * The session that generated these could not download them: the machine it
 * ran on is behind an egress policy that blocks the media host. Your machine
 * is not, so this script does the fetch, the crop and the encode in one go.
 *
 *   node scripts/fetch-shots.mjs
 *
 * Each file lands under the exact name the menu already points at, so there
 * is nothing to wire up afterwards. Rerun the build and the photographs are
 * simply there in place of the coloured stand ins.
 *
 * Add a slug and a URL to SHOTS to bring in more. Anything already holding a
 * photograph is left alone unless you pass --force.
 */
import { existsSync } from "node:fs";
import sharp from "sharp";

/** Dish slug, matching the image path in src/content/live.ts, to source URL. */
const SHOTS = {
  "pani-puri":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_113818_7bd8b7e8-52b7-4288-85a0-14ded2e84c9a.png",
  "cheese-burger":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_28a90730-3b85-4941-9278-991639c02a20.png",
  "cheese-chilli-toast":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_3b471cd1-aebd-4d09-a3a9-efb6959aa79b.png",
  "veg-cheese-frankie":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_887e98c8-5589-458b-9916-d34d8fb1a79d.png",
  "classic-margherita":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_a16f13af-5b4d-494b-9c4a-45b6c9deffca.png",
  "blue-lagoon-mojito":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_7e66e663-67f1-4b90-a026-8a51b6a92537.png",
  "butter-dabeli":
    "https://d8j0ntlcm91z4.cloudfront.net/user_32oRIy1aBuhJQxiJCni8oPg68ME/hf_20260826_114930_781aaf3f-131e-4ef4-b968-d06ea08bbf75.png",
};

/** The shape the panel crops to, and small enough to serve without thought. */
const W = 1400, H = 1050;

const force = process.argv.includes("--force");
let written = 0, kept = 0, failed = 0;

for (const [slug, url] of Object.entries(SHOTS)) {
  const file = `public/live/${slug}.jpg`;
  if (existsSync(file) && !force) {
    // A placeholder is a file too, so this only helps on a rerun. Pass
    // --force the first time if the stand ins are still in place.
    kept++;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize(W, H, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(file);
    written++;
    console.log(`  ${slug}`);
  } catch (err) {
    failed++;
    console.error(`  ${slug} failed: ${err.message}`);
  }
}

console.log(
  `\nFetched ${written}, left ${kept} in place, ${failed} failed.` +
  (kept && !force ? " Pass --force to replace the stand ins." : ""),
);
if (failed) process.exitCode = 1;
