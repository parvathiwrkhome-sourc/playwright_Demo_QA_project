class TransactionPage{
    constructor(page) {
        this.page = page;
        this.newTransactionButton = page.locator('#new-transaction-link');
        this.transactionModal = page.locator('#transaction-modal');
        this.transactionModalTitle = page.locator('#modal-title');
        this.transactionType = page.locator('[data-testid="transaction-type-select"]');
        this.transactionAccount = page.locator('[data-testid="from-account-select"]');
        this.fromAccount = page.locator('[data-testid="from-account-select"]');
        this.toAccount = page.locator('[data-testid="to-account-select"]');
        this.transactionAmount = page.locator('#transaction-amount');
        this.transactionDescription = page.locator('#transaction-description');
        this.emailNotificationCheck = page.locator('[data-testid="notification-checkbox"]');
        this.transactionCancelButton = page.locator('#cancel-transaction-btn');
        this.submitTransactionButton = page.locator('#submit-transaction-btn');
        this.transactionsTable = page.locator('[data-testid="transactions-table"]');
        this.transactioSuccessMessage = page.locator('.success');
        this.transTypeFieldError = page.locator()
    }
}