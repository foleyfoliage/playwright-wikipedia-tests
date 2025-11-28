import { test } from '../config/global/setup';
import { expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';
import { normalizeText } from '../utils/helpers';

function assertNoResultsMessage(message: string) {
  expect(message.toLowerCase()).toMatch(/no results|error has occurred|could not find/i);
}

test.describe('Wikipedia search - automation support task', () => {

  test('searches for "Quality Assurance" and validates normalized text', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = await home.searchAndOpenFirstResult('Quality Assurance');

    await results.assertPageContains('software testing');

    const pageContent = await page.textContent('#mw-content-text');
    expect(normalizeText(pageContent || '')).toContain('software testing');
  });

  test('verifies that a Wikipedia search triggers external activity', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    await home.gotoHome();

    const detectedRequests: any[] = [];
    let navigationOccurred = false;
    let directArticleNavigation = false;

    page.on('response', (resp) => {
      const url = resp.url();
      if (
        url.includes('/w/rest.php/v1/search/') ||
        url.includes('/w/api.php')
      ) {
        detectedRequests.push(resp);
      }
    });

    page.on('framenavigated', frame => {
      const url = frame.url();
      if (url.includes('/wiki/Special:Search')) {
        navigationOccurred = true;
      }
      if (url.includes('/wiki/Quality_assurance') || url.toLowerCase().includes('quality_assurance')) {
        directArticleNavigation = true;
      }
    });

    await home.search('Quality Assurance');
    await page.waitForLoadState('networkidle');

    const searchTriggeredSomething =
      detectedRequests.length > 0 ||
      navigationOccurred ||
      directArticleNavigation;

    expect(searchTriggeredSomething).toBeTruthy();

    console.log(
      `API: ${detectedRequests.length} | Special:Search: ${navigationOccurred} | Direct article: ${directArticleNavigation}`
    );
  });

  test('searching with a long nonsense string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search(
      'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. ' +
      'Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris ' +
      'sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,'
    );

    const message = normalizeText(await results.getNoResultsMessage());
    console.log('No results message:', message);

    assertNoResultsMessage(message);
  });

  test('searching with an empty string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('');

    const count = await page.locator(results.resultsSelector).count();
    console.log('Number of search results:', count);

    expect(count).toBe(0);
  });

});
