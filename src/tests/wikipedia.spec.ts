// src/tests/wikipedia.spec.ts
import { test, expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';
import { normalizeText } from '../utils/helpers';

test.describe('Wikipedia search - automation support task', () => {

  test('searches for "Quality Assurance" and validates normalized text', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = await home.searchAndOpenFirstResult('Quality Assurance');

    // Original assertion
    await results.assertPageContains('software testing');

    // Optional: demonstrate helper usage
    const pageContent = await page.textContent('#mw-content-text');
    expect(normalizeText(pageContent || '')).toContain('software testing');
  });

  test('verifies that a Wikipedia API/network request occurs during search', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    await home.gotoHome();

    // Array to collect matching API responses
    const apiResponses: any[] = [];

    // Listen for all responses
    page.on('response', (resp) => {
      if (
        (resp.url().includes('/w/rest.php/v1/search/title') || resp.url().includes('/w/api.php')) &&
        resp.status() === 200
      ) {
        apiResponses.push(resp);
      }
    });

    await home.search('Quality Assurance');

    // Wait a short time to ensure responses are received
    await page.waitForTimeout(2000);

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

    const message = await results.getNoResultsMessage();

    // Log the no-results message for clarity
    console.log('No results message:', message);

    expect(message.toLowerCase()).toContain('an error has occurred while searching');
  });

  test('searching with an empty string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('');

    const count = await page.locator(results.resultsSelector).count();

    // Log number of results for clarity
    console.log('Number of search results:', count);

    expect(count).toBe(0);
  });

});
