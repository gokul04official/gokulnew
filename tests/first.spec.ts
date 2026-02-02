import { test } from '@playwright/test';

test("first test", async ({page}) => {
  await page.goto("https://www.amazon.in/");
  console.log("This is the first test");
});