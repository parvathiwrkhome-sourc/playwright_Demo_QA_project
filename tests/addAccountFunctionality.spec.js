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

  test('Add Account success flow and verify columns', async ({ page }) => {
    
    await addAccountPage.createAccount({
        name: 'Test Account',
        type: 'Savings Account',
        balance: '1000',
        status: 'Active',
        overdraft: true
    });

    const toastText = await addAccountPage.successMessageToast();
    if (toastText) {
      expect(toastText).toContain('Account created successfully!');
    }

    const row = addAccountPage.getAccountRow('Test Account');
    await expect(row.name).toContainText('Test Account');
    await expect(row.type).toContainText('Savings');
    await expect(row.balance).toContainText('$1,000.00');
    await expect(row.status).toContainText('Active');
  });
});
