import { BasePage } from './init';
import { Page, Locator } from '@playwright/test';

export class WikipediaSearchResultsPage extends BasePage {
  readonly resultsSelector = '#mw-content-text .mw-search-result-heading a';
  readonly noResultsSelector =
    '#mw-content-text .cdx-message--error .cdx-message__content p, #mw-content-text .mw-search-nonefound';
  readonly articleHeadingSelector = '#firstHeading';

  constructor(page: Page) {
    super(page);
  }

  firstResult(): Locator {
    return this.page.locator(this.resultsSelector).first();
  }

  async openFirstResult(): Promise<void> {
    if (await this.page.locator(this.articleHeadingSelector).isVisible()) return;

    await this.page.waitForSelector(this.resultsSelector, { timeout: 15000, state: 'visible' });
    await this.firstResult().click();
    await this.page.waitForSelector(this.articleHeadingSelector, { timeout: 15000, state: 'visible' });
  }

  noResultsMessage(): Locator {
    return this.page.locator(this.noResultsSelector);
  }

  async getNoResultsMessage(): Promise<string> {
    const locator = this.page.locator(this.noResultsSelector);
    await locator.first().waitFor({ state: 'visible', timeout: 10000 });
    return locator.first().innerText();
  }

  async assertPageContains(text: string): Promise<void> {
    const elements = this.page.locator('#mw-content-text, .hatnote');
    await elements.first().waitFor({ state: 'visible', timeout: 15000 });

    const allText = await elements.evaluateAll((els) =>
      els
        .filter((el): el is HTMLElement => el instanceof HTMLElement)
        .map((el) => el.innerText)
        .join(' ')
    );

    if (!allText.toLowerCase().includes(text.toLowerCase())) {
      throw new Error(`Text "${text}" not found in page content`);
    }
  }
}
