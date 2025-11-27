import { BasePage } from './init';
import { Page, Locator, expect } from '@playwright/test';

export class WikipediaSearchResultsPage extends BasePage {
  readonly resultsSelector = '#mw-content-text .mw-search-result-heading a';
  readonly noResultsSelector = '.mw-search-nonefound';
  readonly articleHeadingSelector = '#firstHeading';

  constructor(page: Page) {
    super(page);
  } 

  firstResult(): Locator {
    return this.page.locator(this.resultsSelector).first();
  }

  async openFirstResult(): Promise<void> {
    // If article is already loaded (direct match), skip clicking
    const articleLoaded = await this.page.locator(this.articleHeadingSelector).isVisible();
    if (articleLoaded) return;

    await this.page.waitForSelector(this.resultsSelector, { timeout: 15000, state: 'visible' });
    await this.firstResult().click();
    await this.page.waitForSelector(this.articleHeadingSelector, { timeout: 15000, state: 'visible' });
  }

  noResultsMessage(): Locator {
    return this.page.locator(this.noResultsSelector);
  }

  async getNoResultsMessage(): Promise<string> {
    await this.page.waitForSelector(this.noResultsSelector, { timeout: 10000 });
    return this.noResultsMessage().innerText();
  }

  async assertPageContains(text: string): Promise<void> {
    // Wait for at least one element to be visible
    const elements = this.page.locator('#mw-content-text, .hatnote');
    await elements.first().waitFor({ state: 'visible', timeout: 15000 });

    // Get innerText from all elements (ignore SVGs just in case)
    const allText = await elements.evaluateAll((els) =>
      els
        .filter((el): el is HTMLElement => el instanceof HTMLElement) // type guard
        .map((el) => el.innerText)
        .join(' ')
    );

    // Case-insensitive check
    if (!allText.toLowerCase().includes(text.toLowerCase())) {
      throw new Error(`Text "${text}" not found in page content`);
    }
  }


}
