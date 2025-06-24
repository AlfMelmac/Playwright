import { test, expect } from '@playwright/test';

test('login/logout', async ({ page }) => {
  // connexion
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  // verification d'un produit
  await expect(page.getByTestId('item-4-img-link')).toBeVisible();
  // deconnexion
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByTestId('logout-sidebar-link').click();
  // verification du deconnexion
  await expect(page.getByTestId('login-button')).toBeVisible();
});

test('login locked account', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('locked_out_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByTestId('login-button')).toBeVisible();
});

test('check out product', async ({ page }) => {

  // connexion
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('item-4-img-link')).toBeVisible();

  // filter from high to low
  await page.getByTestId('product-sort-container').selectOption('hilo');

  // get first product
  const first = page.getByTestId('inventory-list').locator(':scope > *').first();
  const firstButton = first.locator('button');
  const firstName = await first.locator('.inventory_item_name').innerText();

  // get second product
  const second = page.getByTestId('inventory-list').locator(':scope > *').nth(1);
  const secondButton = second.locator('button');
  const secondName = await second.locator('.inventory_item_name').innerText();

  // add them to cart
  await firstButton.click();
  await secondButton.click();
  await page.getByTestId('shopping-cart-link').click();

  // check if right product are in the cart
  const cart = page.getByTestId('cart-list').locator(':scope > *');
  const firstCart = await cart.nth(2).locator('.inventory_item_name').innerText();
  const secondCart = await cart.nth(3).locator('.inventory_item_name').innerText();
  expect(firstName).toBe(firstCart);
  expect(secondName).toBe(secondCart);
  await page.getByTestId('checkout').click();

  // checkout
  await page.getByTestId('firstName').fill('Raphael');
  await page.getByTestId('lastName').fill('Darras');
  await page.getByTestId('postalCode').fill('59000');
  await page.getByTestId('continue').click();

  await expect(page.getByTestId('title')).toHaveText('Checkout: Overview')
});