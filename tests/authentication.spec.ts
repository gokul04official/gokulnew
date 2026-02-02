
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';


test('@smoke login with valid admin credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
});

test('@smoke login with valid agent credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('agent', 'agent123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
});


// test('@smoke login with invalid agent credentials', async ({ page }) => {
//   const login = new LoginPage(page);
//   await login.goto();
//   await login.login('agent', 'agent12');
//   await login.assertErrorVisible();
// });

test('@smoke verify logout successfully', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('admin', 'admin123');
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDashboard();
  await dashboard.logout();
  await login.assertSignedOut();
});






