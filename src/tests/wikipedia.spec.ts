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

  test('verifies that a Wikipedia API/network request occurs during search', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    await home.gotoHome();

    const apiResponses: any[] = [];
    const responseListener = (resp: any) => {
      if (
        (resp.url().includes('/w/rest.php/v1/search/title') || resp.url().includes('/w/api.php')) &&
        resp.status() === 200
      ) {
        apiResponses.push(resp);
      }
    };

    page.on('response', responseListener);

    await home.search('Quality Assurance');

    // Wait a short while to ensure any responses are captured
    await page.waitForTimeout(2000);

    page.removeListener('response', responseListener);

    expect(apiResponses.length).toBeGreaterThan(0);
    expect(apiResponses[0].ok()).toBeTruthy();
    console.log(`Detected ${apiResponses.length} Wikipedia API/network request(s).`);
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
