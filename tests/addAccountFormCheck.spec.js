const { test, expect } = require('@playwright/test');
const { AddAccountPage } = require('../page-object/addAccount.js');

test.describe('Add Account Page features', () => {
    let addAccountPage;

    test.beforeEach(async ({ page }) => {
        addAccountPage = new AddAccountPage(page);
        await page.goto('https://qaplayground.com/bank');
        await page.fill('[data-testid="username-input"]', 'admin');
        await page.fill('[data-testid="password-input"]', 'admin123');
        await page.click('[data-testid="login-button"]');
        await expect(page.locator('#brand-name')).toBeVisible();
        await page.click('[data-testid="quick-add-account"]');
    
    });

test('Add Account page title and fields to be visible', async ({ page }) => {
  
  await expect(page.locator('#modal-title')).toBeVisible();

  expect(await addAccountPage.isFormVisible()).toBeTruthy();

  await expect(addAccountPage.accountName).toBeVisible();
  await expect(addAccountPage.accountType).toBeVisible();
  await expect(addAccountPage.initialBalance).toBeVisible();
  await expect(addAccountPage.statusActive).toBeVisible();
  await expect(addAccountPage.statusInactive).toBeVisible();
  await expect(addAccountPage.enableOverDraft).toBeVisible();
  await expect(addAccountPage.saveButton).toBeVisible();
  await expect(addAccountPage.cancelButton).toBeVisible();
});


});
