import { BasePage } from './init';
import { Page, Locator } from '@playwright/test';

export class WikipediaSearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  firstResult(): Locator {
    return this.page.locator('#mw-content-text .mw-search-result-heading a').first();
  }

  async openFirstResult() {
    await this.firstResult().click();
  }
}
