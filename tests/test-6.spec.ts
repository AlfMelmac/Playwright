import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('listitem').click();
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('option', { name: 'Choose Saturday, June 21st,' }).click();
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('option', { name: 'Choose Tuesday, June 3rd,' }).click();
});