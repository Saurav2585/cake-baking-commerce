// One-off Playwright screenshot script for the R2B2V-Direction concept review gate.
// Not part of the app or its test suite — run manually, then delete.
import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");
const outDir = path.resolve(__dirname, "../screenshots");

const shots = [
  { concept: "concept-a", page: "homepage.html", w: 1440, h: 900, out: "concept-a-01-homepage-1440.png" },
  { concept: "concept-a", page: "homepage.html", w: 390, h: 844, out: "concept-a-02-homepage-390.png" },
  { concept: "concept-a", page: "plp.html", w: 1440, h: 900, out: "concept-a-03-plp-1440.png" },
  { concept: "concept-a", page: "pdp.html", w: 1440, h: 900, out: "concept-a-04-pdp-1440.png" },
  { concept: "concept-a", page: "pdp.html", w: 390, h: 844, out: "concept-a-05-pdp-390.png" },

  { concept: "concept-b", page: "homepage.html", w: 1440, h: 900, out: "concept-b-01-homepage-1440.png" },
  { concept: "concept-b", page: "homepage.html", w: 390, h: 844, out: "concept-b-02-homepage-390.png" },
  { concept: "concept-b", page: "plp.html", w: 1440, h: 900, out: "concept-b-03-plp-1440.png" },
  { concept: "concept-b", page: "pdp.html", w: 1440, h: 900, out: "concept-b-04-pdp-1440.png" },
  { concept: "concept-b", page: "pdp.html", w: 390, h: 844, out: "concept-b-05-pdp-390.png" },

  { concept: "concept-c", page: "homepage.html", w: 1440, h: 900, out: "concept-c-01-homepage-1440.png" },
  { concept: "concept-c", page: "homepage.html", w: 390, h: 844, out: "concept-c-02-homepage-390.png" },
  { concept: "concept-c", page: "plp.html", w: 1440, h: 900, out: "concept-c-03-plp-1440.png" },
  { concept: "concept-c", page: "pdp.html", w: 1440, h: 900, out: "concept-c-04-pdp-1440.png" },
  { concept: "concept-c", page: "pdp.html", w: 390, h: 844, out: "concept-c-05-pdp-390.png" },
];

const browser = await chromium.launch();
const consoleErrors = [];

for (const shot of shots) {
  const context = await browser.newContext({ viewport: { width: shot.w, height: shot.h } });
  const page = await context.newPage();
  page.on("pageerror", (err) => consoleErrors.push(`${shot.out}: pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`${shot.out}: console.error: ${msg.text()}`);
  });
  const fileUrl = "file://" + path.join(repoRoot, "design_review/recovery_r2b2_direction", shot.concept, shot.page);
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(outDir, shot.out) });
  await context.close();
  console.log("captured", shot.out);
}

await browser.close();

if (consoleErrors.length) {
  console.log("\n--- console/page errors detected ---");
  for (const e of consoleErrors) console.log(e);
} else {
  console.log("\nNo console or page errors on any screenshot.");
}
