#!/usr/bin/env node
/**
 * Generates one SVG per dish and per counter.
 *
 * These are stand ins for photography, not decoration for its own sake. Every
 * host that serves stock imagery is blocked by this environment's egress
 * policy, so rather than ship empty panels these are built locally from each
 * dish's real colours: jalebi is amber and syrup, pani puri is dark mint and
 * fried wheat, cold coffee is roast and cream. The result reads as abstract
 * food photography, every tile is visibly its own dish, and the whole set
 * weighs a few kilobytes.
 *
 * Replace any file with a real photograph of the same name and nothing else
 * needs to change.
 */
import { writeFileSync, mkdirSync } from "node:fs";

/** base, then two or three accents drawn from the actual food. */
const DISHES = {
  // Pizza
  "margherita":        ["#E7C68D", ["#C0392B", "#F5E3B8", "#4E7B3A"]],
  "corn-and-cheese":   ["#EBD49A", ["#E8B93B", "#F7EFD6", "#C99A2E"]],
  "paneer-tikka":      ["#E0AE85", ["#C75B2E", "#F2E8DC", "#6B3A22"]],
  // Sandwich and toast
  "bombay-masala-toast": ["#E4CFA6", ["#5B7B3A", "#E8CFA0", "#B4762F"]],
  "grilled-cheese":    ["#EBCF95", ["#E0B24D", "#F8EED4", "#B07A2A"]],
  "paneer-tikka-grill":["#DFB491", ["#C75B2E", "#EFE2D2", "#7A4526"]],
  // Chaat
  "pani-puri":         ["#CDBE97", ["#3E6B4A", "#D9B37A", "#7A5A34"]],
  "sev-puri":          ["#DFC48C", ["#E3B34A", "#7A4A2A", "#EFE0BC"]],
  "bhel-puri":         ["#E2D2AC", ["#EAD9B0", "#8A4B2A", "#C4A45E"]],
  // From the tawa
  "pav-bhaji":         ["#D9A184", ["#B33A22", "#F2D06B", "#7C3A1E"]],
  "cheese-pav-bhaji":  ["#DFAE86", ["#B33A22", "#F6DE94", "#8A4526"]],
  "vada-pav":          ["#DFB77E", ["#D99A3A", "#EFE0C0", "#7C4A22"]],
  // Live sweets
  "jalebi":            ["#EFC178", ["#E8951E", "#C97A16", "#FBE6BE"]],
  "gulab-jamun":       ["#C79A6E", ["#6B3A1E", "#A45A24", "#E8CFA8"]],
  "rasgulla":          ["#E8DFCC", ["#F7F3EA", "#D9CBAE", "#B9A681"]],
  // Cold counter
  "cold-coffee":       ["#C2A283", ["#4A3020", "#D9C3A5", "#8A6244"]],
  "mango-shake":       ["#F0C574", ["#F0A828", "#FBE7BC", "#C97F1C"]],
  "chocolate-shake":   ["#B08A6A", ["#52341F", "#D6BCA0", "#7C5334"]],
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

function art(name, base, accents) {
  const r = rng(name);
  const W = 1000, H = 1250;
  const CX = 500, CY = 620, PLATE = 330;

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
<filter id="grain">
<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
<feColorMatrix type="saturate" values="0"/>
</filter>
<radialGradient id="vig" cx="50%" cy="46%" r="76%">
<stop offset="0.5" stop-color="#3A231A" stop-opacity="0"/>
<stop offset="1" stop-color="#3A231A" stop-opacity="0.4"/>
</radialGradient>
<clipPath id="dish"><circle cx="${CX}" cy="${CY}" r="${PLATE}"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="#EFE0CB"/>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE + 62}" fill="#FFFFFF" opacity="0.14"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE + 62}" fill="none" stroke="#3A231A" stroke-width="2" opacity="0.09"/>
<circle cx="${CX}" cy="${CY}" r="${PLATE}" fill="url(#plate)"/>
<g clip-path="url(#dish)">
<g filter="url(#soft)">${pieces.join("")}</g>
<g filter="url(#tiny)">${specks.join("")}</g>
</g>
<circle cx="${CX}" cy="${CY}" r="${PLATE}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.3"/>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.14" style="mix-blend-mode:multiply"/>
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

const write = (dir, table) => {
  mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const [name, [base, accents]] of Object.entries(table)) {
    writeFileSync(`${dir}/${name}.svg`, art(name, base, accents));
    n++;
  }
  return n;
};

const a = write("public/live", DISHES);
const b = write("public/counters", COUNTERS);
console.log(`Wrote ${a} dish panels and ${b} counter panels.`);
