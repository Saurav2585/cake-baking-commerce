// R2B2F-POLISH evidence capture: deterministic Playwright screenshots for
// design_review/recovery_r2b2_final_polish/. Waits for networkidle plus an
// explicit "every <img> complete + decoded" check before every screenshot —
// the interactive preview tool used during development repeatedly showed
// blank frames for images that were already fully loaded (confirmed via
// live DOM inspection), a capture-timing artifact this script is written
// to avoid for the official evidence package.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.EVIDENCE_BASE_URL ?? "http://127.0.0.1:3000";
const OUT_DIR = path.resolve(
  process.env.EVIDENCE_OUT_DIR ??
    "design_review/recovery_r2b2_final_polish/screenshots",
);

// Only waits on images currently within (or just below) the viewport —
// off-screen lazy images intentionally haven't started loading yet, and
// waiting on those would hang forever on a "fold" screenshot.
async function waitForImagesSettled(page) {
  try {
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll("img")).every((img) => {
          const rect = img.getBoundingClientRect();
          // A `display:none` (or otherwise zero-area) image — e.g. the
          // hero collage's mobile-hidden .collage-b chip — never triggers
          // Next/Image's IntersectionObserver-based lazy load, and
          // correctly so: it isn't visible, so it isn't a capture defect.
          if (rect.width === 0 || rect.height === 0) return true;
          const inOrNearView =
            rect.top < window.innerHeight * 2 &&
            rect.bottom > -window.innerHeight;
          if (!inOrNearView) return true;
          return img.complete && img.naturalWidth > 0;
        }),
      undefined,
      { timeout: 45000 },
    );
  } catch (err) {
    const stuck = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .map((img) => {
          const rect = img.getBoundingClientRect();
          const chain = [];
          let el = img.parentElement;
          for (let i = 0; i < 6 && el; i++) {
            chain.push(el.className || el.tagName);
            el = el.parentElement;
          }
          return {
            src: img.currentSrc || img.src,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            top: Math.round(rect.top),
            width: rect.width,
            height: rect.height,
            chain,
          };
        })
        .filter(
          (x) =>
            x.top < window.innerHeight * 2 &&
            !(x.complete && x.naturalWidth > 0),
        ),
    );
    console.error(
      "url:",
      page.url(),
      "viewport:",
      page.viewportSize(),
      "STUCK IMAGES:",
      JSON.stringify(stuck, null, 2),
    );
    throw err;
  }
  // Let CSS transitions/animations (card hover-scale, GSAP entrances) settle.
  await page.waitForTimeout(350);
}

async function scrollThrough(page) {
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewport = page.viewportSize()?.height ?? 900;
  for (let y = 0; y <= scrollHeight; y += Math.floor(viewport * 0.9)) {
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const mobile390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const mobile360 = await browser.newContext({
    viewport: { width: 360, height: 800 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });

  async function capturePage(ctx, url, baseName, { scroll = true } = {}) {
    const page = await ctx.newPage();
    await page.goto(BASE_URL + url, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.screenshot({
      path: path.join(OUT_DIR, `${baseName}-fold.png`),
    });
    if (scroll) {
      await scrollThrough(page);
      await waitForImagesSettled(page);
    }
    await page.screenshot({
      path: path.join(OUT_DIR, `${baseName}-full.png`),
      fullPage: true,
    });
    await page.close();
  }

  console.log("Homepage...");
  await capturePage(desktop, "/", "01-homepage-1440");
  await capturePage(mobile390, "/", "02-homepage-390");

  console.log("PLP...");
  await capturePage(desktop, "/shop", "03-plp-1440");
  await capturePage(mobile390, "/shop", "04-plp-390");

  console.log("PDP...");
  const pdpUrl = "/products/wilton-16-inch-disposable-decorating-bags";
  await capturePage(desktop, pdpUrl, "05-pdp-1440");
  await capturePage(mobile390, pdpUrl, "06-pdp-390");

  console.log("PDP mobile sticky CTA states...");
  {
    const page = await mobile390.newPage();
    await page.goto(BASE_URL + pdpUrl, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    // Before activation: natural in-flow CTA, no pin.
    await page.screenshot({
      path: path.join(OUT_DIR, "07-sticky-cta-before-390.png"),
    });
    // Active/pinned: scroll past the sentinel, well before the footer.
    const sentinelBottom = await page.evaluate(() => {
      const el = document.querySelector(".cta-sentinel");
      const rect = el.getBoundingClientRect();
      return rect.bottom + window.scrollY;
    });
    await page.evaluate((y) => window.scrollTo(0, y + 300), sentinelBottom);
    await page.waitForFunction(
      () =>
        document
          .querySelector(".purchase-actions")
          ?.getAttribute("data-pinned") === "true",
      undefined,
      { timeout: 5000 },
    );
    await page.waitForTimeout(500); // let the GSAP entrance settle
    await page.screenshot({
      path: path.join(OUT_DIR, "08-sticky-cta-active-390.png"),
    });
    // Released: scroll to the footer.
    await page.evaluate(() =>
      document
        .querySelector(".site-footer")
        ?.scrollIntoView({ block: "start" }),
    );
    await page.waitForFunction(
      () =>
        document
          .querySelector(".purchase-actions")
          ?.getAttribute("data-pinned") === "false",
      undefined,
      { timeout: 5000 },
    );
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(OUT_DIR, "09-sticky-cta-footer-release-390.png"),
    });
    await page.close();
  }

  console.log("PDP at 360x800 and 390x844...");
  await capturePage(mobile360, pdpUrl, "10-pdp-360x800", { scroll: false });
  await capturePage(mobile390, pdpUrl, "11-pdp-390x844", { scroll: false });

  console.log("PDP at 200% zoom...");
  {
    const page = await desktop.newPage();
    await page.goto(BASE_URL + pdpUrl, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.evaluate(() => {
      document.documentElement.style.zoom = "200%";
    });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUT_DIR, "12-pdp-200pct-zoom-1440.png"),
      fullPage: true,
    });
    await page.close();
  }
  {
    const page = await mobile390.newPage();
    await page.goto(BASE_URL + pdpUrl, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.evaluate(() => {
      document.documentElement.style.zoom = "200%";
    });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUT_DIR, "13-pdp-200pct-zoom-390.png"),
      fullPage: true,
    });
    await page.close();
  }

  console.log("Cart and checkout (mobile)...");
  // R2B2R fix: the prior evidence script waited on `networkidle` after
  // clicking through to /checkout, which is entirely disconnected from
  // CheckoutForm's own `!ready` gate (CommerceProvider's localStorage
  // hydration, gone in 5-314ms in every scenario measured live — see
  // tests/e2e/checkout-regression.spec.ts). That produced a screenshot of
  // the transient "Measuring the pantry…" state instead of the populated
  // checkout UI. This waits for the actual readiness condition instead.
  async function waitForCheckoutReady(page) {
    await page.waitForFunction(
      () => !document.body.innerText.includes("Measuring the pantry"),
      undefined,
      { timeout: 10000 },
    );
    await page.waitForSelector(".cart-summary", { timeout: 10000 });
    await page.waitForTimeout(150);
  }
  {
    const page = await mobile390.newPage();
    await page.goto(BASE_URL + pdpUrl, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.getByRole("button", { name: /add.*demo cart/i }).click();
    await page.waitForTimeout(300);
    await page.goto(BASE_URL + "/cart", { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.screenshot({
      path: path.join(OUT_DIR, "14-cart-390.png"),
      fullPage: true,
    });
    // Loading-to-ready timing evidence: capture the transient state
    // immediately after the click (best-effort — it may already have
    // resolved), then the actual ready state, both timestamped.
    const clickedAt = Date.now();
    await page.getByRole("link", { name: /simulated checkout/i }).click();
    await page.screenshot({
      path: path.join(OUT_DIR, "15-checkout-loading-390.png"),
    });
    await waitForCheckoutReady(page);
    const readyAt = Date.now();
    console.log(
      `  cart-to-checkout: ready ${readyAt - clickedAt}ms after click`,
    );
    await page.screenshot({
      path: path.join(OUT_DIR, "16-checkout-cart-to-checkout-390.png"),
      fullPage: true,
    });
    await page.close();
  }
  {
    // Direct-navigation checkout evidence, both required mobile viewports.
    for (const [ctx, label] of [
      [mobile390, "390"],
      [mobile360, "360"],
    ]) {
      const page = await ctx.newPage();
      // addInitScript (not a post-navigation evaluate()) so the seed always
      // wins the race against CommerceProvider's own mount-time write-back
      // effect — see tests/e2e/checkout-regression.spec.ts's seedCart() for
      // the full explanation of why a post-goto evaluate() can flake.
      await page.addInitScript(() => {
        localStorage.setItem(
          "pantryform:cart:v1",
          JSON.stringify({
            schemaVersion: 1,
            revision: 1,
            lines: [
              {
                sku: "WLT-BAG-0012",
                quantity: 1,
                observedUnitPricePaise: 45000,
                productId: "prod_real_wilton_decorating_bags",
                variantId: "var_wilton_decorating_bags_0",
                productTitle: "16-Inch Disposable Decorating Bags",
                variantLabel: "12-pack",
                brandName: "Wilton",
                sources: [{ kind: "manual" }],
              },
            ],
          }),
        );
      });
      const t0 = Date.now();
      await page.goto(BASE_URL + "/checkout", { waitUntil: "networkidle" });
      await waitForCheckoutReady(page);
      console.log(`  direct nav ${label}px: ready ${Date.now() - t0}ms`);
      await page.screenshot({
        path: path.join(OUT_DIR, `17-checkout-direct-nav-${label}.png`),
        fullPage: true,
      });
      await page.close();
    }
  }

  console.log("Reduced motion + keyboard focus sanity...");
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(BASE_URL + pdpUrl, { waitUntil: "networkidle" });
    await waitForImagesSettled(page);
    await page.screenshot({
      path: path.join(OUT_DIR, "16-pdp-reduced-motion-390.png"),
    });
    await page.close();
    await ctx.close();
  }

  await desktop.close();
  await mobile390.close();
  await mobile360.close();
  await browser.close();
  console.log("Done ->", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
