import { expect, test } from "@playwright/test";

test("home to product to cart and simulated checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page
    .getByRole("link", { name: /ingredients/i, exact: false })
    .first()
    .click();
  await page.locator(".product-card").first().getByRole("link").first().click();
  const variants = page.locator(".variant-selector button");
  if ((await variants.count()) > 1) await variants.nth(1).click();
  await page.getByRole("button", { name: /add.*demo cart/i }).click();
  await page.getByRole("link", { name: /cart/i }).first().click();
  await expect(page.getByText(/simulated commerce/i)).toBeVisible();
  await page.getByRole("link", { name: /simulated checkout/i }).click();
  await page.getByLabel(/home baker demo/i).check();
  await page.getByLabel(/I understand/i).check();
  await page.getByRole("button", { name: /complete simulation/i }).click();
  await expect(page.getByText(/no payment/i)).toBeVisible();
});

test("search and filter stay URL addressable", async ({ page }) => {
  await page.goto("/search?q=cocoa");
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(page).toHaveURL(/q=cocoa/);
});

test("recipe review computes and adds exact packs", async ({ page }) => {
  await page.goto("/recipes/cocoa-celebration-cake");
  await page.getByRole("link", { name: /review supplies/i }).click();
  await expect(page.getByText(/leftover/i).first()).toBeVisible();
  await page.getByRole("button", { name: /add selected/i }).click();
  await expect(page.getByText(/added to demo cart/i)).toBeAttached();
});

test("invalid persistence recovers and reduced motion remains usable", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "pantryform:cart:v1",
      '{"version":1,"lines":[{"sku":"STALE"}]}',
    ),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/cart");
  await expect(page.getByText(/cart is empty/i)).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("mobile navigation and 360px reflow", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});
