import { test, expect } from "@playwright/test";

test("Test Case 8: Verify Product Page", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle("Automation Exercise");
  await page.getByRole("link", { name: /Products/ }).click();
  await expect(
    page.getByText(/All Products/) && page.locator(".features_items"),
  ).toBeVisible();
  await page
    .getByRole("link", { name: /View Product/ })
    .first()
    .click();
  await expect(page).toHaveTitle(/Product Details/);
  await expect(page.locator(".product-information")).toBeVisible();
});
