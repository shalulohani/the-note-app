const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./helpers/appPages/LoginPage');
const { NotesPage } = require('./helpers/appPages/NotesPage');

test('User should be able to edit the first note', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const notesPage = new NotesPage(page);

  // Login first
  await loginPage.login('demo@example.com', 'demo123');

  // Wait for notes list
  await page.waitForSelector('.note-item:first-child', { timeout: 15000 });

  // Edit the first note
  await notesPage.editFirstNote('Updated note text');

  // Verify the change
  await expect(page.locator('.note-item:first-child')).toContainText('Updated note text');
});
