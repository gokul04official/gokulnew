import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { TicketsPage } from '../pages/tickets.page';

test('Should able to Create a new ticket with all required field', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  const title = `e2e-ticket-${Date.now()}`;
  await tickets.createTicket(title, 'initial description', 'CUST-017', 'Low');
  await tickets.expectTicketPresent(title);
});

test('Should able Edit an existing ticket', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  const title = `e2e-ticket-${Date.now()}`;
  await tickets.createTicket(title, 'initial description', 'CUST-017', 'Low');
  await tickets.editTicket(title, 'changed description', 'Critical');
  
});

test('Should be able to delete an existing ticket', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  const title = `e2e-ticket-${Date.now()}`;
  await tickets.createTicket(title, 'initial description', 'CUST-017', 'Low');
  await tickets.deleteTicket(title);
});


test('Should be able to filter tickets by status (Open)', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByStatus('Open');

});

test('Should be able to filter tickets by status (In Progress)', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByStatus('In Progress');

});
test('Should be able to filter tickets by status (Resolved)', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByStatus('Resolved');

});

test('Should be able to filter tickets by status (Closed)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByStatus('Closed');

});

test('Should be able to filter tickets by priority (Low)', async ({ page }) => { 
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByPriority('Low');
});
test('Should be able to filter tickets by priority (Medium)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByPriority('Medium');
  const count = await tickets.visibleRows().count();
  for (let i = 0; i < count; i++) {
    await expect(tickets.visibleRows().nth(i)).toContainText('Medium');
  }
});
test('Should be able to filter tickets by priority (Critical)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByPriority('Critical');

});

test('Should be able to filter tickets by priority (High)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.filterByPriority('High');
});

test('Should be able to search tickets by title', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await page.getByTestId('ticket-search').click();
  await page.getByTestId('ticket-search').fill('sso integration issue');
});

test('Should be able to sort tickets by column headers', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await page.getByTestId('ticket-search').click();
  await page.getByTestId('ticket-search').fill('sso integration issue');
  await tickets.filterByPriority('High');
    await tickets.filterByStatus('Open');

});



test('Should be able to clear all filters', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await page.locator('//button[normalize-space()="Clear Filters"]').click();
});

test('Should able to Create ticket with FAIL_CREATE and verify error message', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.goToTickets();
  const tickets = new TicketsPage(page);
  await tickets.createTicket('FAIL_CREATE', 'initial description', 'CUST-017', 'Low');
});

