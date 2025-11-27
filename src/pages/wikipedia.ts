import { Page } from '@playwright/test';

export class WikipediaHomePage {
  readonly page: Page;
  readonly searchInput = 'input[name="search"]';

  constructor(page: Page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto('https://en.wikipedia.org/wiki/Main_Page', { waitUntil: 'domcontentloaded' });
  }

async search(query: string): Promise<void> {
  try {
    await this.page.fill(this.searchInput, query);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForLoadState('domcontentloaded');
  } catch (err) {
    throw new Error(`Search failed for query "${query}": ${err}`);
  }
}
}
