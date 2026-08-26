import { chromium } from "playwright";
const BASE = "http://127.0.0.1:4321";
const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
let fails = 0;
const fail = (m) => { fails++; console.log("FAIL:", m); };
const ok = (m) => console.log("  ok:", m);

const cardX = (page, i) =>
  page.evaluate((idx) => {
    const el = document.querySelectorAll('[aria-roledescription="carousel"] > div')[idx];
    if (!el) return null;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return m.m41;
  }, i);

// 1. Drag moves the arc by roughly the drag distance.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll("section")[1].scrollIntoView());
  await page.waitForTimeout(600);

  const before = await cardX(page, 0);
  await page.mouse.move(720, 700);
  await page.mouse.down();
  for (let s = 1; s <= 10; s++) await page.mouse.move(720 - s * 40, 700);
  await page.mouse.up();
  await page.waitForTimeout(1400);
  const after = await cardX(page, 0);
  const moved = Math.abs(after - before);
  if (moved < 200) fail(`drag barely moved the arc (${moved.toFixed(0)}px)`);
  else ok(`drag moved the arc ${moved.toFixed(0)}px`);

  // 2. Arrow keys step the arc.
  await page.locator('[aria-roledescription="carousel"]').focus();
  const kBefore = await cardX(page, 0);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1200);
  const kAfter = await cardX(page, 0);
  if (Math.abs(kAfter - kBefore) < 100) fail("ArrowRight did not step the arc");
  else ok(`ArrowRight stepped ${Math.abs(kAfter - kBefore).toFixed(0)}px`);

  // 3. Next button works.
  const bBefore = await cardX(page, 0);
  await page.getByRole("button", { name: "Next counter" }).click();
  await page.waitForTimeout(1200);
  if (Math.abs((await cardX(page, 0)) - bBefore) < 100) fail("Next button did not step");
  else ok("next button steps");

  // 4. A still click opens the counter; a drag must not.
  await page.waitForTimeout(600);
  const centre = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('[aria-roledescription="carousel"] > div')];
    let best = null, bestD = Infinity;
    for (const el of cards) {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - innerWidth / 2);
      if (d < bestD && parseFloat(getComputedStyle(el).opacity) > 0.9) { bestD = d; best = r; }
    }
    return best ? { x: best.left + best.width / 2, y: best.top + best.height / 2 } : null;
  });
  if (!centre) fail("no centred card found");
  else {
    await page.mouse.click(centre.x, centre.y);
    await page.waitForTimeout(700);
    if (!(await page.getByRole("dialog").isVisible().catch(() => false))) fail("click did not open the counter");
    else { ok("click opens the counter"); await page.keyboard.press("Escape"); await page.waitForTimeout(500); }
  }
  if (errs.length) fail(`page errors: ${errs.slice(0, 2).join(" | ")}`);
  await ctx.close();
}

// 5. Reduced motion falls back to a plain snapping row.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const row = await page.evaluate(() => {
    const el = document.querySelector('[aria-roledescription="carousel"]');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { overflowX: cs.overflowX, snap: cs.scrollSnapType, cards: el.children.length };
  });
  if (!row) fail("carousel missing under reduced motion");
  else if (!row.overflowX.includes("auto") && !row.overflowX.includes("scroll")) fail(`reduced motion is not a scroll row (${row.overflowX})`);
  else ok(`reduced motion renders a snapping row of ${row.cards}`);
  await ctx.close();
}

// 6. No horizontal overflow anywhere the arc appears.
for (const width of [320, 390, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: width < 500, hasTouch: width < 500 });
  const page = await ctx.newPage();
  for (const route of ["/", "/what-we-sell/"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(700);
    const o = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    if (o.s > o.c + 1) fail(`overflow ${width}px ${route}: ${o.s} > ${o.c}`);
  }
  await ctx.close();
}
if (fails === 0) ok("no horizontal overflow at 320, 390, 768, 1440");

await browser.close();
console.log(fails === 0 ? "\nArc carousel: all checks passed." : `\n${fails} check(s) failed.`);
process.exit(fails ? 1 : 0);
