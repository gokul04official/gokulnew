import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly navTickets: Locator;
  readonly navCustomers: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navTickets = page.locator('//a[@data-testid="nav-tickets"]');
    this.navCustomers = page.locator('//a[@routerlink="/customers"]');
  }

  async clickDashboardHeading() {
    await this.page.getByRole('heading', { name: 'Dashboard' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectDashboardHeadingVisible() {
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async expectNavTicketsVisible() {
    await expect(this.navTickets).toBeVisible();
  }

  async clickNavTickets() {
    await this.navTickets.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectNavCustomersVisible() {
    await expect(this.navCustomers).toBeVisible();
  }

  async clickNavCustomers() {
    await this.navCustomers.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectHeadingContains(text: string) {
    await expect(this.page.getByRole('heading')).toContainText(text);
  }
}
