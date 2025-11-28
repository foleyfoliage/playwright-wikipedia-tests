import { test } from '../config/global/setup';
import { expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';
import { normalizeText } from '../utils/helpers';

test.describe('Wikipedia search - edge cases', () => {

  test('search with special characters returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('!@#$%^&*');

    const message = await results.getNoResultsMessage();
    console.log('No results message for special characters:', message);
    console.log('No results message:', message);
    expect(
    message.toLowerCase()
).toMatch(/no results|error has occurred/);

  });

  test('search with an extremely long string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('a'.repeat(5000));

    const message = await results.getNoResultsMessage();
    console.log('No results message for long string:', message);
    expect(message.toLowerCase()).toContain('an error has occurred while searching');
  });

  test('search is case-insensitive and works with mixed-case queries', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = await home.searchAndOpenFirstResult('qUaLiTy AsSuRaNcE');

    await results.assertPageContains('software testing');

    const pageContent = await page.textContent('#mw-content-text');
    expect(normalizeText(pageContent || '')).toContain('software testing');
  });

  test('search for terms in different languages', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = await home.searchAndOpenFirstResult('informática');
    await results.assertPageContains('computing');
  });

});
