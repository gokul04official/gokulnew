import { Page, Locator, expect } from '@playwright/test';

export class TicketsPage {
  readonly page: Page;
  readonly createButton: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly customerSelect: Locator;
  readonly prioritySelect: Locator;
  readonly submitButton: Locator;
  readonly recentTicketRows: Locator;
  readonly editbutton:Locator;
  readonly deletebutton:Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByTestId('create-ticket-button');
    this.titleInput = page.getByTestId('ticket-form-title');
    this.descriptionInput = page.getByTestId('ticket-form-description');
    this.customerSelect = page.getByTestId('ticket-form-customer');
    this.prioritySelect = page.getByTestId('ticket-form-priority');
    this.submitButton = page.getByTestId('ticket-form-submit');
    this.recentTicketRows = page.locator('[data-testid^="recent-ticket-row-"]');
    this.editbutton=page.locator('//a[normalize-space()="Edit Ticket"]');
    this.deletebutton=page.locator('//button[normalize-space()="Delete Ticket"]');  
  }

  async openCreateForm() {
    await this.createButton.click();
    await this.titleInput.waitFor({ state: 'visible' });
  }

  async createTicket(title: string, description: string, customerValue: string, priorityValue: string) {
    await this.openCreateForm();
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.customerSelect.selectOption(customerValue);
    await this.prioritySelect.selectOption(priorityValue);
    await this.submitButton.click();
  }

  getTicketRow(title: string) {
    return this.page.locator('[data-testid^="recent-ticket-row-"]', { hasText: title });
  }

  async expectTicketPresent(title: string) {
    const row = this.getTicketRow(title);
  }

  async openEditForTicket(title: string) {
    const row = this.getTicketRow(title);
    await this.editbutton.click();
  }

  async editTicket(title: string, newDescription: string, newPriority: string) {
    await this.openEditForTicket(title);
    await this.descriptionInput.fill(newDescription);
    await this.prioritySelect.selectOption(newPriority);
    await this.submitButton.click();
  }

  async recentTicketsCount() {
    return await this.recentTicketRows.count();
  }

  async deleteTicket(title: string) {
    const row = this.getTicketRow(title);
    await this.deletebutton.click();
  }

  async filterByStatus(status: string) {
    await this.page.getByTestId('filter-status').selectOption(status);
    await this.page.waitForLoadState('networkidle');
  }

  async filterByPriority(priority: string) {
    await this.page.getByTestId('filter-priority').selectOption(priority);
    await this.page.waitForLoadState('networkidle');
  }

  visibleRows() {
    return this.recentTicketRows;
  }
}

