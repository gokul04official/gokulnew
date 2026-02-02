
import { test,expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

test('Verify dashboard statistics are displayed', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
const statistics = [
  ['stat-open-tickets', 'Open Tickets'],
  ['stat-assigned-tickets', 'Assigned to Me'],
  ['stat-total-tickets', 'Total Tickets'],
  ['stat-customers', 'Customers'],
];

for (const [id, text] of statistics) {
  await expect(page.getByTestId(id)).toContainText(text);
}

});

test('Verify recent tickets table displays up to 5 tickets', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
const rows = page.locator('[data-testid^="recent-ticket-row-"]');
await expect(rows).toHaveCount(5);
});



test('navigation - dashboard to tickets via View All', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  await dashboard.expectOnTicketsPage();
});
