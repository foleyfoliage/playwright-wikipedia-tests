import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async assertPageContains(text: string) {
    await expect(this.page.getByText(new RegExp(text, 'i'))).toBeVisible();
  }
}
