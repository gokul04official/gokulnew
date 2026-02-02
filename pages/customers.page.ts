import { Page, Locator, expect } from '@playwright/test';

export class CustomersPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly slaFilter: Locator;
  readonly statusFilter: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Customers' });
    this.slaFilter = page.getByTestId('filter-sla');
    this.statusFilter = page.getByTestId('filter-active');
    this.tableRows = page.locator('table tbody tr');
  }

  async goto() {
    await this.page.goto('https://simonluckenuikvalsoft.github.io/qa-test-sample-application/customers');
    await this.waitForCustomers();
  }

  async waitForCustomers() {
    await this.heading.waitFor({ state: 'visible' });
    await expect(this.tableRows.first()).toBeVisible();
  }

  async filterBySLA(sla: string) {
    await this.slaFilter.selectOption(sla);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByStatus(status: string) {
    await this.statusFilter.selectOption(status);
    await this.page.waitForLoadState('networkidle');
  }

  async expectAllRowsContain(text: string) {
    const count = await this.tableRows.count();
    for (let i = 0; i < count; i++) {
      await expect(this.tableRows.nth(i)).toContainText(text);
    }
  }

  async searchByEmail(email: string) {
    const search = this.page.getByTestId('customer-search');
    await search.fill(email);
    await search.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async expectCustomerRowContains(idOrText: string) {
    const row = this.page.getByTestId(`customer-row-${idOrText}`).first();
    await expect(row).toBeVisible();
  }

  async createCustomer({ name, email, company, sla }: { name: string; email: string; company: string; sla: string; }) {
    await this.page.getByTestId('create-customer-button').click();
    await this.page.getByTestId('customer-form-name').fill(name);
    await this.page.getByTestId('customer-form-email').fill(email);
    await this.page.getByTestId('customer-form-company').fill(company);
    await this.page.getByTestId('customer-form-sla').selectOption(sla);
    await this.page.getByTestId('customer-form-save').click();
    await this.searchByEmail(email);
  }

  async expectAnyRowContains(text: string) {
    const rows = this.tableRows;
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const rowText = await rows.nth(i).innerText();
      if (rowText.includes(text)) {
        return;
      }
    }
    throw new Error(`No customer row contains: ${text}`);
  }
}


