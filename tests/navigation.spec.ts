import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { NavigationPage } from '../pages/navigation.page';

test('verify all navigation', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.expectDashboardHeadingVisible();
  await nav.expectNavTicketsVisible();
  await nav.clickNavTickets();
  await nav.expectHeadingContains('Tickets');
  await nav.expectNavCustomersVisible();
  await nav.clickNavCustomers();
  await nav.expectHeadingContains('Customers');
});
