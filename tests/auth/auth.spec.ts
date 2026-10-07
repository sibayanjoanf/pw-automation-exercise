import { test, expect } from "@playwright/test";

// Global
const validEmail = "test_true@gmail.com";
const validPass = "murphypogi";
const validUser = "AutomaTest";
const invalidEmail = "test_false@gmail.com";
const invalidPass = "murphypanget";

test.describe("Authentication", () => {
  test("Test Case 1: Register User", async ({ page }) => {
    const tstamp = Date.now();
    const email = `test_${tstamp}@gmail.com`;
    const username = "autoTestLoop";
    const password = "murphypogi";

    //Signup
    await page.goto("http://automationexercise.com");
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await expect(
      page.getByRole("heading", { name: "New User Signup!" }),
    ).toBeVisible();
    await page.getByPlaceholder("Name").fill(username);
    await page
      .locator('form[action="/signup"] input[type="email"]')
      .fill(email);
    await page.getByRole("button", { name: "Signup" }).click();

    //Login Form (after signup)
    await expect(
      page.getByRole("heading", { name: "Enter Account Information" }),
    ).toBeVisible();
    await page.getByLabel("Mrs").click();
    await page.getByLabel("Password").fill(password);
    await page.locator("#days").selectOption("31");
    await page.locator("#months").selectOption("October");
    await page.locator("#years").selectOption("2005");
    await page.getByLabel("Sign up for our newsletter!").check();
    await page.getByLabel("Receive special offers from our partners!").check();
    await page.locator("#first_name").fill("Automation");
    await page.locator("#last_name").fill("Tester");
    await page.locator("#company").fill("Murphy Incorporation");
    await page.locator("#address1").fill("Address 1");
    await page.locator("#address2").fill("Address 2");
    await page.locator("#country").selectOption("Canada");
    await page.locator("#state").fill("Ottawa");
    await page.locator("#city").fill("Skater City");
    await page.locator("#zipcode").fill("1490");
    await page.locator("#mobile_number").fill("12345678");
    await page.getByRole("button", { name: "Create Account" }).click();

    // Account Created
    await expect(
      page.getByRole("heading", { name: "Account Created!" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
    await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();

    // Delete Account
    await page.getByRole("link", { name: "Delete Account" }).click();
    await expect(
      page.getByRole("heading", { name: "Account Deleted!" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
  });

  test("Test Case 2: Login User (Valid)", async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Login to your account" }),
    ).toBeVisible();
    await page
      .locator('form[action="/login"] input[type="email"]')
      .fill(validEmail);
    await page.getByPlaceholder("Password").fill(validPass);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(`Logged in as ${validUser}`)).toBeVisible();
  });

  test("Test Case 3: Login User (Invalid)", async ({ page }) => {
    await page.goto("http://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await expect(page.getByText("Login to your account")).toBeVisible();
    await page
      .locator('form[action="/login"] input[type="email"]')
      .fill(invalidEmail);
    await page.getByPlaceholder("Password").fill(invalidPass);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("Your email or password is incorrect!"),
    ).toBeVisible();
  });
});
