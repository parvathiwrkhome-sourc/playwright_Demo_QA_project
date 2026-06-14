class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = 'button[type="submit"]';
    }

    async goto() {
        await this.page.goto('https://qaplayground.com/', { waitUntil: 'networkidle' });
        await this.page.click('text=Open Bank App');
       // await this.page.waitForSelector('#username', { timeout: 30000});
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async clearFields() {
        await this.page.click('[data-testid="clear-button"]');
    }

    async checkboxRememberMe() {
        await this.page.check('[data-testid="remember-checkbox"]');
    }
}

module.exports = { LoginPage };