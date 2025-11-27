import { test, expect, Page } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';

async function searchAndOpen(page: Page, query: string): Promise<WikipediaSearchResultsPage> {
  const home = new WikipediaHomePage(page);
  const results = new WikipediaSearchResultsPage(page);

  await home.gotoHome();
  await home.search(query);
  await results.openFirstResult();

  return results;
}

test.describe('Wikipedia search - automation support task', () => {

  test('searches for Quality Assurance and validates result contains "software testing"', async ({ page }) => {
    const results = await searchAndOpen(page, 'Quality Assurance');
    await results.assertPageContains('software testing');
  });

  test('verifies that a Wikipedia API/network request occurs during search', async ({ page }) => {
    const home = new WikipediaHomePage(page);

    page.on('response', response => {
      console.log(`[Network] ${response.status()} -> ${response.url()}`);
    });

  const apiResponsePromise = page.waitForResponse(response =>
    (response.url().includes('/w/rest.php/v1/search/title') ||
    response.url().includes('/w/api.php')) &&
    response.status() === 200
  );


    await home.gotoHome();
    await home.search('Quality Assurance');

    const response = await apiResponsePromise;
    expect(response.ok()).toBe(true);

    const data = await response.json();
    expect(data.pages.length).toBeGreaterThan(0);
  });

  test('searching with a long string returns no results', async ({ page }) => {
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
    expect(count).toBe(0); // no search results
  });

});
