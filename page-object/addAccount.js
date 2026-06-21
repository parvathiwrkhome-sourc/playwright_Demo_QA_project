class AddAccountPage {
  constructor(page) {
    this.page = page;
    this.formTitle = page.locator('#modal-title');
    this.accountName = page.locator('#account-name');
    this.accountType = page.locator('[data-testid="account-type-select"]');
    this.initialBalance = page.locator('#initial-balance');
    this.statusActive = page.locator('#status-active');
    this.statusInactive = page.locator('#status-inactive');
    this.enableOverDraft = page.locator('#enable-overdraft');
    this.saveButton = page.locator('#save-account-btn');
    this.cancelButton = page.locator('#cancel-btn');
    this.successMessage = page.locator('.success');
    this.accountsTable = page.locator('[data-testid="accounts-table"]');
    this.accountNameFieldError = page.locator('#account-name-error');
    this.AccountTypeFieldError = page.locator('#account-type-error');
    this.initialBalanceFieldError = page.locator('#initial-balance-error');

  }

  async isFormVisible() {
    return await this.formTitle.isVisible();
  }

  async enterAccountName(name) {
    await this.accountName.fill(name);
  }

  async selectAccountType(type) {
    await this.accountType.click();
    await this.page.locator('[role="option"]', { hasText: type }).click();
  }

  async enterInitialBalance(amount) {
    await this.initialBalance.fill(String(amount));
  }

  async selectStatus(status) {
    if (status === 'Active') {
      await this.statusActive.check();
    } else {
      await this.statusInactive.check();
    }
  }

  async toggleOverDraft(enable = true) {
    if (enable) {
      await this.enableOverDraft.check();
    } else {
      await this.enableOverDraft.uncheck();
    }
  }

  async saveAccount() {
    await this.saveButton.click();
  }

  async cancelAccount() {
    await this.cancelButton.click();
  }

  async successMessageToast() {
    return await this.successMessage.textContent().catch(() => '');
  }

  async createAccount({ name, type, balance, status, overdraft}) {
    await this.enterAccountName(name);
    await this.selectAccountType(type);
    await this.enterInitialBalance(balance);
    await this.selectStatus(status);
    await this.toggleOverDraft(overdraft);
    await this.saveAccount();
  }

  // 🔑 Helper: get a row by account name
  getAccountRow(accountName) {
    const row = this.page.locator('[data-testid="accounts-tbody"] tr', {
      has: this.page.locator('[data-testid="account-name"] a', { hasText: accountName })
    });
    return {
      row,
      name: row.locator('[data-testid="account-name"] a').first(), 
      type: row.locator('[data-testid="account-type"]'),
      balance: row.locator('[data-testid="account-balance"]'),
      status: row.locator('[data-testid="account-status"]')
    };
  }
}

module.exports = { AddAccountPage };
