import { test, expect } from "@playwright/test";

test("Test Case 12: Add Products in Cart", async ({ page }) => {
  await page.goto("http://automationexercise.com");
  await expect(page).toHaveTitle(/Automation Exercise/);
  await page.getByRole("link", { name: /Products/ }).click();
  await expect(page.getByText(/All Products/)).toBeVisible();
  let chosenProd = [];

  // first product add
  const firstProd = page.locator(".single-products").nth(0);
  chosenProd.push(await firstProd.locator(".overlay-content p").innerText());
  await firstProd.hover();
  await firstProd.locator(".overlay-content .add-to-cart").click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();

  // second product add
  const secProd = page.locator(".single-products").nth(1);
  chosenProd.push(await secProd.locator(".overlay-content p").innerText());
  await secProd.hover();
  await secProd.locator(".overlay-content .add-to-cart").click();
  await page.getByRole("link", { name: "View Cart" }).click();

  // verify cart via count
  await expect(page).toHaveTitle(/Checkout/);
  const table = page.locator("#cart_info_table");
  await expect(table.locator("tbody tr")).toHaveCount(2);

  // verify cart via product name
  for (const prodName of chosenProd) {
    await expect(
      table.locator(".cart_description", { hasText: prodName }),
    ).toBeVisible();
  }
});
