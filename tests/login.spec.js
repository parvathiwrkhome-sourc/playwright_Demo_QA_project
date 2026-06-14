const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-object/loginPage');

test.describe('Login Tests', () => {
let loginPage;
    test.beforeEach(async({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    });

//TC-01 Successful login with admin credentials
test('Admin credentials successful login' , async ({ page }) => {
    await loginPage.login('admin','admin123');
    await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
    await expect(page.locator('#total-balance-title')).toBeVisible();
});

//TC-02 Wrong credentials login shows error
test('Invalid credentials show error', async ({page}) => {
    await loginPage.login('wrong','wrong123');
    await expect(page.getByTestId('login-alert')).toBeVisible();
    await expect(page.getByTestId('login-alert')).toHaveText(/Invalid username or password. Please try again/);
    await expect(page).toHaveURL(/\/bank$/);
});

//TC-03 Toggle Password Visibility
test('Password visibility works', async({ page }) =>{
    await page.fill(loginPage.passwordInput, 'secret');
    await page.click('[data-testid="toggle-password-btn"]');
    await expect(page.locator(loginPage.passwordInput)).toHaveAttribute('type', 'text');
});

//TC-04 enter key login check
test('Press enter key to login', async ({ page }) =>{
    await page.fill(loginPage.usernameInput, 'admin');
    await page.fill(loginPage.passwordInput, 'admin123');
    await page.press(loginPage.passwordInput, 'Enter');
    await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
});

//TC-05 read only login check
test('Read only user access to dashboard', async({ page }) => {
    await loginPage.login('viewer', 'viewer123');
    await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
    await expect(page.locator('#viewer-badge')).toHaveText('Read-only');
});

//TC-06 Clear button functionality
test('reset of fields with clear button', async ({ page}) => {
    await page.fill(loginPage.usernameInput, 'admin');
    await page.fill(loginPage.passwordInput, 'admin123');
    await page.click('[data-testid="clear-button"]');
    await loginPage.clearFields();
    await expect(page.locator(loginPage.passwordInput)).toHaveValue('');
});

//TC-07 Remember Me checkbox
test('Remember me checkbox can be checked', async ({ page }) =>{
    await loginPage.checkboxRememberMe();
    await expect(page.locator('[data-testid="remember-checkbox"]')).toBeChecked();
});

});