class TransactionsPage {
    constructor(page) {
        this.page = page;
        this.newTransactionButton = page.locator('#new-transaction-link');
        this.transactionModal = page.locator('#transaction-modal');
        this.transactionModalTitle = page.locator('#modal-title');
        this.transactionType = page.locator('[data-testid="transaction-type-select"]');
        this.fromAccount = page.locator('[data-testid="from-account-select"]');
        this.toAccount = page.locator('[data-testid="to-account-select"]');
        this.transactionAmount = page.locator('#transaction-amount');
        this.transactionDescription = page.locator('#transaction-description');
        this.emailNotificationCheck = page.locator('[data-testid="notification-checkbox"]');
        this.transactionCancelButton = page.locator('#cancel-transaction-btn');
        this.submitTransactionButton = page.locator('#submit-transaction-btn');
        this.transactionsTable = page.locator('[data-testid="transactions-table"]');
        this.transactionSuccessMessage = page.getByText('Transaction completed successfully!');
        this.transTypeFieldError = page.locator('p[role="alert"]', { hasText: 'Please select transaction type'});
        this.transAccountFieldError = page.locator('p[role="alert"]', { hasText: 'Please select an account'});
        this.transAmountFieldError = page.locator('p[role="alert"]', { hasText: 'Please enter a valid amount'});
    }

    async clickTransactionButton() {
        await this.newTransactionButton.click();
    }

    async isModalVisible() {
        return await this.transactionModal.isVisible();
    }

    async waitForModalToClose() {
        await this.transactionModal.waitFor({ state: 'hidden' });
    }

async selectTransactionType(type) {
     await this.transactionType.click();
     await this.page.getByRole('listbox').waitFor({ state: 'visible' });
    await this.page.getByRole('option', { name: type, exact: true }).click();
}

async logTransactionTypes() {
    await this.transactionType.click();
    await this.page.getByRole('listbox').waitFor({ state: 'visible' });
    const options = await this.page.getByRole('option').allTextContents();
    console.log(options);
    await this.page.keyboard.press('Escape');
}

async selectFromAccount(name) {
    await this.fromAccount.click();
    await this.page.getByRole('listbox').waitFor({ state: 'visible' });
    await this.page.getByRole('option', { name }).click();
}

     async selectToAccount(name) {
        await this.toAccount.click();
        await this.page.getByRole('listbox').waitFor({ state: 'visible' });
        await this.page.getByRole('option', { name }).click();
    }

    async enterTransactionAmount(amount) {
        await this.transactionAmount.fill(String(amount));
    }

    async enterDescription(text) {
        await this.transactionDescription.fill(String(text));
    }

    async emailNotification(enable = true) {
        if(enable){
            await this.emailNotificationCheck.check();
        } else {
            await this.emailNotificationCheck.uncheck();
        }
    }

    async submitTransaction() {
        await this.submitTransactionButton.click();
    }

    async cancelTransaction() {
        await this.transactionCancelButton.click();
    }

    async successMessageTransaction() {
    await this.transactionSuccessMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.transactionSuccessMessage.textContent();
}

async performTransaction({transactionType, fromAccount, toAccount, transactionAmount, transactionDescription, notification}) {
    await this.selectTransactionType(transactionType);
    if (fromAccount) {
        await this.selectFromAccount(fromAccount);
    }
    if (toAccount) {
        await this.selectToAccount(toAccount);
    }
    await this.enterTransactionAmount(transactionAmount);
    await this.enterDescription(transactionDescription);
    await this.emailNotification(notification);
    await this.submitTransaction();
}
}

module.exports = { TransactionsPage };