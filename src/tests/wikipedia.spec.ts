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

    const apiResponsePromise = page.waitForResponse(response =>
      response.url().includes('/w/api.php') && response.status() === 200
    );

    await home.gotoHome();
    await home.search('Quality Assurance');

    const response = await apiResponsePromise;
    expect(response.ok()).toBe(true);
  });

  test('searching for a nonsense term returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('qwertyuiopasdf');

    const message = await results.getNoResultsMessage();
    expect(message.toLowerCase()).toContain('did not match any articles');
  });

  test('searching with an empty string returns no results', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('');

    const message = await results.getNoResultsMessage();
    expect(message.toLowerCase()).toContain('did not match any articles');
  });

});
