import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto('https://pass-the-note-app.vercel.app/login', {
      waitUntil: 'networkidle'
    });

    // Ensure page is ready
    await this.page.waitForSelector('input[name="email"]', { timeout: 15000 });
  }

  async login(email: string, password: string) {
    await this.gotoLogin();

    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('button[type="submit"]')
    ]);

    // Verify login success
    await expect(this.page).toHaveURL(/dashboard/i);
  }
}
