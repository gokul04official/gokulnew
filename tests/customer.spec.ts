import { test ,expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { NavigationPage } from '../pages/navigation.page';
import { CustomersPage } from '../pages/customers.page';

test('Filter customers by SLA level (Gold)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await customers.filterBySLA('Gold');
  await customers.expectAllRowsContain('Gold');
});

test('Filter customers by SLA level (Silver)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await customers.filterBySLA('Silver');
  await customers.expectAllRowsContain('Silver');
});

test('Filter customers by SLA level (Bronze)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await customers.filterBySLA('Bronze');
});

test('Filter customers by Status (Active)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await customers.filterByStatus('active');
});

test('Filter customers by Status (Inactive)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await customers.filterByStatus('inactive');
});

test('Search customers by email ', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  await page.getByTestId('customer-search').click();
  await page.getByTestId('customer-search').fill('contact@acme.com');
  await expect(page.getByTestId('customer-row-CUST-001')).toContainText('Acme Corporation');
});

test('Create a new customer ', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  const nav = new NavigationPage(page);
  await nav.clickNavCustomers();
  const customers = new CustomersPage(page);
  await customers.waitForCustomers();
  const email = `remo+${Date.now()}@example.com`;
  await customers.createCustomer({ name: 'remo', email, company: 'tidle', sla: 'Gold' });
  await customers.expectAnyRowContains('remo');
  await customers.expectAnyRowContains(email);
});
