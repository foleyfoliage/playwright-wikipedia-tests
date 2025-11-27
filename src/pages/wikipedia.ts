import { BasePage } from './init';
import { Page } from '@playwright/test';

export class WikipediaHomePage extends BasePage {
  private searchInput = 'input[name="search"]';

  constructor(page: Page) {
    super(page);
  }

  async gotoHome() {
    await this.goto('https://www.wikipedia.org/');
  }

  async search(query: string) {
    await this.page.fill(this.searchInput, query);
    await this.page.press(this.searchInput, 'Enter');
  }
}
