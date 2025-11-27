// src/tests/wikipedia.spec.ts
import { test, expect, Page } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';

test.describe('Wikipedia search - automation support task', () => {

  test('searches for "Quality Assurance" and validates result contains "software testing"', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = await home.searchAndOpenFirstResult('Quality Assurance');
    await results.assertPageContains('software testing');
  });

  test('verifies that a Wikipedia API/network request occurs during search', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    await home.gotoHome();

    // Ensure listener is active before triggering search
    const apiResponsePromise = page.waitForResponse(resp =>
      (resp.url().includes('/w/rest.php/v1/search/title') || resp.url().includes('/w/api.php')) &&
      resp.status() === 200
    );

    await home.search('Quality Assurance');

    const apiResponse = await apiResponsePromise;
    expect(apiResponse.ok()).toBeTruthy();
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
    expect(message.toLowerCase()).toContain('an error has occurred while searching');
  });

  test('searching with an empty string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('');

    const count = await page.locator(results.resultsSelector).count();
    expect(count).toBe(0);
  });

});
