#!/usr/bin/env node
/**
 * House style guard: no dash characters in anything a visitor reads.
 *
 * Two passes:
 *   1. Unicode dashes (em, en, figure, minus, horizontal bar) are banned
 *      everywhere under src/. They have no legitimate use in this codebase.
 *   2. ASCII hyphens are banned inside prose. Prose means string literals in
 *      src/content/ and JSX text nodes in components. Slugs, class names,
 *      URLs and other technical strings are exempt, detected by shape.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const UNICODE_DASH = /[‐‑‒–—―−]/;
const PROSE_HYPHEN = /[A-Za-z0-9]-[A-Za-z0-9]/;

/** Addresses, identifiers, class names and CSS: never read as prose. */
const isTechnical = (s) =>
  /^[a-z0-9/_.#-]*$/.test(s) ||                 // slugs, ids, paths
  /^(https?:|mailto:|tel:|#|\/|\.\/|@|data:)/.test(s) ||
  /^[-a-z0-9:/[\]().%\s]+$/.test(s);           // tailwind class strings

const walk = (dir, out = []) => {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css)$/.test(p)) out.push(p);
  }
  return out;
};

const problems = [];
const files = walk(SRC);

for (const file of files) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    if (UNICODE_DASH.test(line)) {
      problems.push({ rel, line: i + 1, kind: "unicode dash", text: line.trim() });
    }
  });

  // Pass two only inspects prose.
  const isContent = rel.startsWith("src/content");
  if (isContent) {
    // Every quoted string in a content file is copy unless it looks technical.
    const re = /(["'])((?:\\.|(?!\1)[^\\\r\n])*)\1/g;
    let m;
    while ((m = re.exec(src))) {
      const value = m[2];
      if (!PROSE_HYPHEN.test(value)) continue;
      if (isTechnical(value)) continue;
      const line = src.slice(0, m.index).split("\n").length;
      problems.push({ rel, line, kind: "hyphen in copy", text: value });
    }
  } else if (file.endsWith(".tsx")) {
    // JSX text nodes: whatever sits between a > and the next <.
    const re = />([^<>{}]*[A-Za-z][^<>{}]*)</g;
    let m;
    while ((m = re.exec(src))) {
      const value = m[1].trim();
      if (!value || !PROSE_HYPHEN.test(value)) continue;
      const line = src.slice(0, m.index).split("\n").length;
      problems.push({ rel, line, kind: "hyphen in JSX text", text: value });
    }
  }
}

if (problems.length === 0) {
  console.log(`No dash characters in copy. Checked ${files.length} files.`);
  process.exit(0);
}

console.error(`Found ${problems.length} dash problem(s):\n`);
for (const p of problems) {
  console.error(`  ${p.rel}:${p.line}  [${p.kind}]`);
  console.error(`    ${p.text.slice(0, 110)}`);
}
process.exit(1);
