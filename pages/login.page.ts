import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('//button[normalize-space()="Sign In"]');
    this.errorMessage = page.locator('text=/invalid|incorrect|wrong/i');
  }


  async login(username: string, password: string) {
    await this.page.goto('https://simonluckenuikvalsoft.github.io/qa-test-sample-application/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async assertErrorVisible() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
  }

  async assertSignedOut() {
    await expect(this.page.getByText('Sign in to your account')).toBeVisible();
  }
} 
