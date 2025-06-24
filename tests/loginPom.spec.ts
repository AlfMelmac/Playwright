import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login1.ts';

test('Log standard', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator("data-test=add-to-cart-sauce-labs-backpack")).toBeVisible();

});