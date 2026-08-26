import { chromium } from "playwright";
const BASE = "http://127.0.0.1:4321";
const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const routes = ["/", "/what-we-sell/", "/live-snacks/", "/about/", "/franchise/", "/contact/"];
const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
let failures = 0;

// 1. Horizontal overflow, the classic responsive bug, at three widths.
for (const width of [320, 390, 768]) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: width < 500, hasTouch: width < 500 });
  const page = await ctx.newPage();
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const over = await page.evaluate(() => {
      const d = document.documentElement;
      const offenders = [];
      if (d.scrollWidth > d.clientWidth + 1) {
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > d.clientWidth + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed") {
            offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 45)}`);
          }
        });
      }
      return { scrollW: d.scrollWidth, clientW: d.clientWidth, offenders: offenders.slice(0, 3) };
    });
    if (over.scrollW > over.clientW + 1) {
      failures++;
      console.log(`OVERFLOW ${width}px ${route}: ${over.scrollW} > ${over.clientW}`, over.offenders);
    }
  }
  await ctx.close();
}

// 2. Reduced motion: content must be visible, not stuck at opacity 0.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(900);
    const hidden = await page.evaluate(() => {
      let n = 0;
      document.querySelectorAll("h1,h2,h3,p,li").forEach((el) => {
        const r = el.getBoundingClientRect();
        const inView = r.top < innerHeight && r.bottom > 0;
        if (inView && parseFloat(getComputedStyle(el).opacity) < 0.15) n++;
      });
      return n;
    });
    if (hidden > 0) { failures++; console.log(`REDUCED MOTION ${route}: ${hidden} element(s) still invisible`); }
  }
  await page.screenshot({ path: "/tmp/shots4/reduced-motion.png" });
  await ctx.close();
}

// 3. Overlays: mobile menu and the counter dialog.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "/tmp/shots4/menu-open.png" });
  const menuVisible = await page.locator("#mobile-menu").isVisible();
  if (!menuVisible) { failures++; console.log("MENU did not open"); }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  if (await page.locator("#mobile-menu").count()) { failures++; console.log("MENU did not close on Escape"); }
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/what-we-sell/", { waitUntil: "networkidle" });
  // Scoped to the grid tile: the arc carousel above also has a Sweets
  // button, and it drifts, so Playwright can never call it stable.
  await page.locator("li#sweets button").click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: "/tmp/shots4/dialog-open.png" });
  const dlg = await page.getByRole("dialog").isVisible();
  if (!dlg) { failures++; console.log("DIALOG did not open"); }
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  if (await page.getByRole("dialog").count()) { failures++; console.log("DIALOG did not close on Escape"); }
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
