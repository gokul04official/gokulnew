import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly viewAllTickets: Locator;
  readonly ticketsHeading: Locator;
  readonly recentTicketRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.viewAllTickets = page.getByTestId('view-all-tickets');
    this.ticketsHeading = page.locator('h1', { hasText: 'Tickets' });
    this.recentTicketRows = page.locator('[data-testid^="recent-ticket-row-"]');
  }

  async goToTickets() {
    await this.viewAllTickets.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectOnTicketsPage() {
    await expect(this.page).toHaveURL(/tickets/i);
    await expect(this.ticketsHeading).toBeVisible();
  }

  async waitForDashboard() {
    await expect(this.page.getByTestId('stat-open-tickets')).toBeVisible();
  }

  async expectRecentTicketCount(expected: number) {
    await expect(this.recentTicketRows).toHaveCount(expected);
  }

  async expectStats(stats: Array<[string, string]>) {
    for (const [id, text] of stats) {
      await expect(this.page.getByTestId(id)).toContainText(text);
    }
  }

  async logout() {
    await this.page.getByTestId('logout-button').click();
    await expect(this.page.getByText('Sign in to your account')).toBeVisible();
  }
} 

