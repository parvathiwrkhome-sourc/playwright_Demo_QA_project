const { test, expect } = require('@playwright/test');
const { TransactionsPage } = require('../page-object/transactionPage.js');
const { LoginPage } = require ('../page-object/loginPage.js');

test.describe('Transactions module', () => {
    let transactionsPage;

    test.beforeEach(async({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto('https://qaplayground.com/bank');
        await loginPage.login('admin', 'admin123');
        transactionsPage = new TransactionsPage(page);
        await transactionsPage.clickTransactionButton();
    });

test('Field check for transaction modal', async({ page }) => {
    await expect(page.locator('#modal-title')).toBeVisible();

    expect(await transactionsPage.isModalVisible()).toBeTruthy();

    await expect(transactionsPage.transactionType).toBeVisible();
    await expect(transactionsPage.fromAccount).toBeVisible();
    await expect(transactionsPage.transactionAmount).toBeVisible();
    await expect(transactionsPage.transactionDescription).toBeVisible();
    await expect(transactionsPage.emailNotificationCheck).toBeVisible();
    await expect(transactionsPage.submitTransactionButton).toBeVisible();
    await expect(transactionsPage.transactionCancelButton).toBeVisible();
});

test('Deposit amount in account', async({ page }) => {
    await transactionsPage.performTransaction({
    transactionType: 'Deposit',
    fromAccount: 'Primary Savings - $5,000.00',
    transactionAmount: '100',
    transactionDescription: 'test deposit case',
    notification: true
});
    const message = await transactionsPage.successMessageTransaction();
    expect(message).toContain('Transaction completed successfully');
});

test('"Transfer amount between accounts', async({ page }) => {
     await transactionsPage.performTransaction({
        transactionType: 'Transfer',
        fromAccount: 'Primary Savings - $5,000.00',
        toAccount: 'Checking Account (1001234568)',
        transactionAmount: '100',
        transactionDescription: 'test amount transfer',
        notification: false
    });

    const message = await transactionsPage.successMessageTransaction();
    expect(message).toContain('Transaction completed successfully');
});

test('Description field is optional', async({ page }) => {
     await transactionsPage.performTransaction({
        transactionType: 'Withdrawal',
        fromAccount: 'Primary Savings - $5,000.00',
        transactionAmount: '100',
        transactionDescription: '',
        notification: false
    });

    const message = await transactionsPage.successMessageTransaction();
    expect(message).toContain('Transaction completed successfully');
});

test('Description character limit should not exceed 200', async({ page }) => {
    const longText = 'x'.repeat(250);
    await transactionsPage.enterDescription(longText);

    const value = await transactionsPage.transactionDescription.inputValue();
    expect(value.length).toBe(200);
});

//test('Desciption field trims whitespaces', async({ page }) => {
 //   await transactionsPage.enterDescription('   test');
 //   await transactionsPage.transactionDescription.blur();
 //   const value1 = await transactionsPage.transactionDescription.inputValue();
 //   expect(value1).toBe('test');

 //   await transactionsPage.enterDescription('test   ');
 //   const value2 = await transactionsPage.transactionDescription.inputValue();
 //   expect(value2).toBe('test');

 //   await transactionsPage.enterDescription('   ');
 //   const value3 = await transactionsPage.transactionDescription.inputValue();
 //   expect(value3).toBe('');
//});


test('Cancel transaction modal', async({ page }) => {
    await transactionsPage.cancelTransaction();
    await transactionsPage.waitForModalToClose();
    expect(await transactionsPage.isModalVisible()).toBeFalsy();
});

test('Cancel transaction modal while dropdown open', async({ page }) => {
    await transactionsPage.transactionType.click();
    await page.keyboard.press('Escape');
    await transactionsPage.cancelTransaction();
    await transactionsPage.waitForModalToClose();
    expect(await transactionsPage.isModalVisible()).toBeFalsy();
})

test('Field validations for transaction fields', async({ page }) => {
    await transactionsPage.submitTransaction();
    await expect(transactionsPage.transTypeFieldError).toBeVisible();
    await expect(transactionsPage.transAccountFieldError).toBeVisible();
    await expect(transactionsPage.transAmountFieldError).toBeVisible();
    });
});