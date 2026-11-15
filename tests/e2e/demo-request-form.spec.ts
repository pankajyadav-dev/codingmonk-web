import { expect, type Page, test } from "@playwright/test";

async function fillCollegeStep(page: Page) {
  await page.getByLabel("College name").fill("Sample Institute of Technology");
  await page.getByLabel("City").fill("Hyderabad");
  await page.getByLabel("State or union territory").selectOption("Telangana");
}

async function fillBatchStep(page: Page) {
  await page.getByLabel("Students' year").selectOption("final-year");
  await page.getByLabel("Program of interest").selectOption("2-month-placement-sprint");
  await page.getByLabel("Students in the batch").fill("240");
  await page.getByLabel("Target placement season").selectOption("2026-27");
}

async function fillContactStep(page: Page, phone = "98765 43210") {
  await page.getByLabel("Your name").fill("Dr. A. Rao");
  await page.getByLabel("Your designation").selectOption("tpo");
  await page.getByLabel("Mobile number").fill(phone);
  await page.getByLabel("Official email").fill("tpo@sample.edu.in");
  await page.getByLabel(/I agree that CodingMonk may contact me/).check();
}

function randomNetworkAddress() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 250) + 1).join(".");
}

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": randomNetworkAddress() });
});

test("each step explains what is missing before moving on", async ({ page }) => {
  await page.goto("/book-demo");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("alert").first()).toHaveText("Please fill in this field.");
  await expect(page.getByLabel("College name")).toBeFocused();
  await expect(page.getByLabel("College name")).toHaveAttribute("aria-invalid", "true");
  await fillCollegeStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "About the batch" })).toBeVisible();
  await page.getByLabel("Students in the batch").fill("3");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter a batch size between 10 and 5,000.")).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByLabel("College name")).toHaveValue("Sample Institute of Technology");
});

test("phone, email and consent are validated", async ({ page }) => {
  await page.goto("/book-demo");
  await fillCollegeStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await fillBatchStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByLabel("Mobile number").fill("12345");
  await page.getByLabel("Official email").fill("not-an-email");
  await page.getByRole("button", { name: "Send and open WhatsApp" }).click();
  await expect(page.getByText("Enter a valid 10-digit Indian mobile number.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address, like name@college.edu.in.")).toBeVisible();
  await expect(page.getByText("Please agree so we can contact you.")).toBeVisible();
});

test("the request type follows the link, even when the demo page was already open", async ({ page }) => {
  await page.goto("/book-demo?request=sample-report");
  await expect(page.getByLabel("What would you like?")).toHaveValue("sample-report");
  await page.goto("/book-demo");
  await expect(page.getByLabel("What would you like?")).toHaveValue("campus-demo");
  await page.goto("/");
  await page.getByRole("link", { name: "See an example report" }).click();
  await expect(page).toHaveURL(/request=sample-report/);
  await expect(page.getByLabel("What would you like?")).toHaveValue("sample-report");
  await page.getByLabel("What would you like?").selectOption("proposal");
  await expect(page.getByLabel("What would you like?")).toHaveValue("proposal");
});

test("a valid request is saved, opens WhatsApp with the details and shows a reference", async ({ page, context }) => {
  await page.goto("/book-demo");
  await fillCollegeStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await fillBatchStep(page);
  await page.getByRole("button", { name: "Continue" }).click();
  await fillContactStep(page, "+91 98765 43210");
  const whatsappPagePromise = context.waitForEvent("page");
  await page.getByRole("button", { name: "Send and open WhatsApp" }).click();
  const whatsappPage = await whatsappPagePromise;
  const whatsappUrl = new URL(whatsappPage.url());
  await whatsappPage.close();
  expect(whatsappUrl.hostname).toMatch(/wa\.me|whatsapp\.com/);
  await expect(page).toHaveURL(/\/thank-you\?reference=CM-[A-Z0-9]{6}$/);
  const referenceCode = new URL(page.url()).searchParams.get("reference") ?? "";
  await expect(page.getByText(referenceCode)).toBeVisible();
  await expect(page.getByRole("link", { name: "Open WhatsApp again" })).toHaveAttribute(
    "href",
    new RegExp(referenceCode),
  );
});

test("repeated requests from one network are rate limited", async ({ page }) => {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    await page.goto("/book-demo");
    await fillCollegeStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await fillBatchStep(page);
    await page.getByRole("button", { name: "Continue" }).click();
    await fillContactStep(page);
    await page.getByRole("button", { name: "Send and open WhatsApp" }).click();
    const outcome = await Promise.race([
      page.waitForURL(/\/thank-you/).then(() => "saved"),
      page
        .getByText("Too many requests from this network")
        .waitFor()
        .then(() => "rate-limited"),
    ]);
    if (outcome === "rate-limited") return;
  }
  throw new Error("Rate limiting never kicked in");
});

test("every demo button brings the form into view, even when already on the demo page", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /Book a campus demo/ })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/book-demo#demo-form$/);
  await expect(page.getByRole("heading", { name: "Tell us about your college" })).toBeInViewport();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByRole("heading", { name: "Tell us about your college" })).not.toBeInViewport();
  await page.locator("footer").getByRole("link", { name: "Book a campus demo" }).first().click();
  await expect(page.getByRole("heading", { name: "Tell us about your college" })).toBeInViewport();
});
