#!/usr/bin/env node
/**
 * Generates one JPEG per dish and per counter.
 *
 * These are stand ins for photography, not decoration for its own sake. Every
 * host that serves imagery is blocked by this environment's egress policy, so
 * rather than ship empty panels these are built locally from each dish's real
 * colours: a blue lagoon mojito is glass blue and lime, samosa chaat is fried
 * pastry and tamarind, margherita is tomato, mozzarella and basil. The result
 * reads as abstract food photography and every tile is visibly its own dish.
 *
 * They are written as JPEG, at the same aspect and under the same filename a
 * real photograph would use, so replacing one is a matter of dropping the
 * photograph over it. No code changes, no extension to update.
 *
 * Existing files are never overwritten, because most of them are real
 * photographs by now.
 *
 * --force rebuilds them, and on its own it is refused: an unscoped force run
 * flattens every photograph in the project, which is a lot of damage for a
 * flag you reach for to redraw one set. Scope it and it will run:
 *
 *   node scripts/make-dish-art.mjs --force --only=charliee
 *
 * --only=live|counters|charliee also works without --force, to fill gaps in a
 * single set.
 */
import { mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";

/** base, then three accents drawn from the actual food. */
const DISHES = {
  // Chaat
  "pani-puri":           ["#CDBE97", ["#2F5E3E", "#D9B37A", "#7A5A34"]],
  "masala-puri":         ["#D9C08E", ["#8A4B2A", "#E3B34A", "#3E6B4A"]],
  "bhel-puri":           ["#E2D2AC", ["#EAD9B0", "#8A4B2A", "#C4A45E"]],
  "sev-puri":            ["#DFC48C", ["#E3B34A", "#7A4A2A", "#EFE0BC"]],
  "dahi-puri":           ["#E6DBC6", ["#F7F2E8", "#3E6B4A", "#8A4B2A"]],
  "samosa-chaat":        ["#D8B584", ["#B4762F", "#7A3A1E", "#E6D2A8"]],
  "ragda-pattice":       ["#DCC79B", ["#E0C070", "#8A5A2E", "#F0E3C4"]],
  // Burger
  "burger":              ["#DFB77E", ["#C0392B", "#4E7B3A", "#EFE0C0"]],
  "cheese-burger":       ["#E2BC85", ["#E8B93B", "#C0392B", "#F7EFD6"]],
  "peri-peri-burger":    ["#DDAE7C", ["#C4441E", "#E8B93B", "#7C3A1E"]],
  // Sandwich
  "veg-sandwich":        ["#E8DCC0", ["#5B7B3A", "#F5EEDC", "#C4553A"]],
  "toast-sandwich":      ["#E4CFA6", ["#B4762F", "#E8CFA0", "#5B7B3A"]],
  "cheese-chilli-toast": ["#EBCF95", ["#E0B24D", "#4E7B3A", "#F8EED4"]],
  // Frankie
  "veg-frankie":         ["#E0C79C", ["#C08A3A", "#C4441E", "#F2E2C2"]],
  "veg-cheese-frankie":  ["#E4CB9C", ["#E8B93B", "#C08A3A", "#F6E8CC"]],
  // Dabeli
  "butter-dabeli":       ["#DDB483", ["#8A4526", "#C4441E", "#EFDDB8"]],
  "cheese-dabeli":       ["#E0BB8A", ["#E8B93B", "#8A4526", "#F4E6C6"]],
  // Pizza
  "classic-margherita":  ["#E7C68D", ["#C0392B", "#F5E3B8", "#4E7B3A"]],
  "four-cheese":         ["#EBD49A", ["#F7EFD6", "#E8B93B", "#C99A2E"]],
  "peri-peri-pizza":     ["#E3B98A", ["#C4441E", "#F2E0BC", "#8A3A18"]],
  "tandoori-pizza":      ["#E0AE85", ["#C75B2E", "#F2E8DC", "#6B3A22"]],
  // Beverages
  "mint-mojito":         ["#CFE0C0", ["#3E7B4A", "#EAF5E2", "#A8C88A"]],
  "blue-lagoon-mojito":  ["#A8CFE0", ["#2E7FB8", "#E2F2FA", "#1A5A8A"]],
  "sunset":              ["#E8B87E", ["#E8621E", "#F7D9A8", "#C4381E"]],
  "guava-shots":         ["#E8C0B4", ["#D9607A", "#F7E2DA", "#A83A54"]],
};

/** The fifteen counters, coloured from what actually sits on them. */
const COUNTERS = {
  "sweets":           ["#E8CFA4", ["#C68A3A", "#F6EBD4", "#8A5A2A"]],
  "live-sweets":      ["#E3C79E", ["#E8951E", "#FAF0DC", "#A45A24"]],
  "cakes":            ["#EAD3C4", ["#C96B8A", "#FBF0E6", "#8A4E5E"]],
  "bakery":           ["#E6CB9C", ["#C08A3E", "#F7EAD0", "#8A5F2A"]],
  "chocolate":        ["#B58F6E", ["#52341F", "#D9BC9C", "#7C5334"]],
  "namkeen":          ["#E5C583", ["#D9A03A", "#F4E3B8", "#96652A"]],
  "khakhra":          ["#E2C08A", ["#C08A3A", "#F2E2C2", "#7E5628"]],
  "banana-chips":     ["#EBD79A", ["#E3C24A", "#F8EFCE", "#A8842C"]],
  "makhana":          ["#EDE2CC", ["#F7F1E2", "#CBB894", "#9A8460"]],
  "dry-fruits":       ["#DCBE97", ["#8A5A2E", "#E8CFA8", "#5E3A1E"]],
  "saffron":          ["#E9C589", ["#C4441E", "#F6E4C0", "#8A3A18"]],
  "mouth-freshener":  ["#D9DCB4", ["#5B7B3A", "#EFEEDA", "#8A9A54"]],
  "imported":         ["#D6C2A6", ["#3E5A6B", "#EFE6D6", "#8A6A4A"]],
  "classic-sodas":    ["#CBB9A4", ["#B33A22", "#E8DCCA", "#3E5A6B"]],
  "charliee":         ["#E0C7A8", ["#A34A2C", "#F6EBD8", "#6B4326"]],
};


/**
 * Twelve stand ins for the Charliee mosaic, at the four by five the real
 * photographs are supplied at. Coloured from the packs themselves rather than
 * one house tint, so the wall reads as a range of products even before a
 * single real picture lands.
 */
const CHARLIEE = {
  "charliee-01": ["#E4C79E", ["#A34A2C", "#F6EBD8", "#6B4326"]],
  "charliee-02": ["#DFC08C", ["#C08A3A", "#F2E2C2", "#7E5628"]],
  "charliee-03": ["#EDE2CC", ["#F7F1E2", "#CBB894", "#9A8460"]],
  "charliee-04": ["#D9BE97", ["#8A5A2E", "#E8CFA8", "#5E3A1E"]],
  "charliee-05": ["#E8CFA4", ["#C68A3A", "#F6EBD4", "#8A5A2A"]],
  "charliee-06": ["#D9DCB4", ["#5B7B3A", "#EFEEDA", "#8A9A54"]],
  "charliee-07": ["#E9C589", ["#C4441E", "#F6E4C0", "#8A3A18"]],
  "charliee-08": ["#B58F6E", ["#52341F", "#D9BC9C", "#7C5334"]],
  "charliee-09": ["#E5C583", ["#D9A03A", "#F4E3B8", "#96652A"]],
  "charliee-10": ["#EAD3C4", ["#C96B8A", "#FBF0E6", "#8A4E5E"]],
  "charliee-11": ["#EBD79A", ["#E3C24A", "#F8EFCE", "#A8842C"]],
  "charliee-12": ["#D6C2A6", ["#3E5A6B", "#EFE6D6", "#8A6A4A"]],
};

/** Deterministic pseudo random, so a name always yields the same picture. */
function rng(seed) {
  let h = 2166136261;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

/** Four by three, the same shape the generated photography comes back at. */
const LANDSCAPE = { W: 1400, H: 1050, PLATE: 372 };
/** Four by five, the shape every Charliee photograph is supplied at. */
const PORTRAIT = { W: 1200, H: 1500, PLATE: 430 };

function art(name, base, accents, shape) {
  const { W, H, PLATE } = shape === "portrait" ? PORTRAIT : LANDSCAPE;
  const CX = W / 2, CY = H / 2;
  const r = rng(name);

  // Food arranged on a plate rather than a cloud of colour. Heavy blur turned
  // every dish into the same brown smudge, so the shapes stay mostly crisp
  // and only their edges are softened.
  const pieces = [];
  const n = 6 + Math.floor(r() * 4);
  for (let i = 0; i < n; i++) {
    const colour = accents[i % accents.length];
    const ang = (i / n) * Math.PI * 2 + r() * 0.7;
    const dist = r() * PLATE * 0.52;
    const cx = CX + Math.cos(ang) * dist;
    const cy = CY + Math.sin(ang) * dist * 0.86;
    const rad = PLATE * (0.2 + r() * 0.24);
    pieces.push(
      `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${rad.toFixed(0)}" fill="${colour}" opacity="${(0.62 + r() * 0.3).toFixed(2)}"/>`,
    );
  }

  const specks = [];
  for (let i = 0; i < 34; i++) {
    const ang = r() * Math.PI * 2;
    const dist = r() * PLATE * 0.92;
    const cx = CX + Math.cos(ang) * dist;
    const cy = CY + Math.sin(ang) * dist * 0.9;
    specks.push(
      `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(2 + r() * 7).toFixed(1)}" fill="${accents[Math.floor(r() * accents.length)]}" opacity="${(0.3 + r() * 0.45).toFixed(2)}"/>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
<stop offset="0" stop-color="${base}"/>
<stop offset="1" stop-color="${base}" stop-opacity="0.62"/>
</linearGradient>
<radialGradient id="plate" cx="45%" cy="38%" r="70%">
<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.5"/>
<stop offset="1" stop-color="#FFFFFF" stop-opacity="0.12"/>
</radialGradient>
<filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
<feGaussianBlur stdDeviation="13"/>
</filter>
<filter id="tiny" x="-25%" y="-25%" width="150%" height="150%">
<feGaussianBlur stdDeviation="2.4"/>
</filter>
<radialGradient id="vig" cx="50%" cy="46%" r="76%">
<stop offset="0.5" stop-color="#3A231A" stop-opacity="0"/>
<stop offset="1" stop-color="#3A231A" stop-opacity="0.4"/>
</radialGradient>
<clipPath id="dish"><circle cx="${CX}" cy="${CY}" r="${PLATE}"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="#EFE0CB"/>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE + 70}" fill="#FFFFFF" opacity="0.14"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE + 70}" fill="none" stroke="#3A231A" stroke-width="2" opacity="0.09"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE}" fill="url(#plate)"/>
<g clip-path="url(#dish)">
<g filter="url(#soft)">${pieces.join("")}</g>
<g filter="url(#tiny)">${specks.join("")}</g>
</g>
<circle cx="${CX}" cy="${CY}" r="${PLATE}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.3"/>
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

const force = process.argv.includes("--force");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length) : null;

const SETS = ["live", "counters", "charliee"];
if (only && !SETS.includes(only)) {
  console.error(`--only must be one of: ${SETS.join(", ")}`);
  process.exit(1);
}
if (force && !only) {
  console.error(
    "Refusing to force every set at once: that would overwrite real\n" +
    "photography with stand ins. Name the one you mean, for example\n" +
    "  node scripts/make-dish-art.mjs --force --only=charliee",
  );
  process.exit(1);
}

async function write(dir, table, shape) {
  mkdirSync(dir, { recursive: true });
  let written = 0, kept = 0;
  for (const [name, [base, accents]] of Object.entries(table)) {
    const file = `${dir}/${name}.jpg`;
    if (existsSync(file) && !force) {
      kept++;
      continue;
    }
    // Drawn at the shape it is stored at, rather than drawn landscape and
    // cropped, which threw away the coloured edges and left a pale middle.
    await sharp(Buffer.from(art(name, base, accents, shape)))
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(file);
    written++;
  }
  return { written, kept };
}

const wanted = (set) => !only || only === set;

const a = wanted("live") ? await write("public/live", DISHES) : null;
const b = wanted("counters") ? await write("public/counters", COUNTERS) : null;
const c = wanted("charliee")
  ? await write("public/charliee", CHARLIEE, "portrait")
  : null;

const report = (label, r) =>
  r ? `${label}: wrote ${r.written}, left ${r.kept} in place.` : `${label}: skipped.`;

console.log(
  [report("Dishes", a), report("Counters", b), report("Charliee", c)].join(" ") +
  (force ? ` (forced ${only})` : ""),
);
