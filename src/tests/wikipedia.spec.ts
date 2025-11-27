import { test, expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';

test.describe('Wikipedia search - automation support task', () => {

  test('searches for Quality Assurance and validates result contains "software testing"', async ({ page }) => {
    const home: WikipediaHomePage = new WikipediaHomePage(page);
    const results: WikipediaSearchResultsPage = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('Quality Assurance');
    await results.openFirstResult();
    await results.assertPageContains('software testing');
  });

  test('verifies that a Wikipedia API/network request occurs during search', async ({ page }) => {
    const networkRequests: string[] = [];

    page.on('request', req => {
      networkRequests.push(req.url());
    });

    const home: WikipediaHomePage = new WikipediaHomePage(page);
    const results: WikipediaSearchResultsPage = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('Quality Assurance');
    await results.openFirstResult();

    const apiRequestMade: boolean = networkRequests.some(url => url.includes('/w/api.php'));
    expect(apiRequestMade).toBe(true);
  });

  test('searching for a nonsense term returns no results', async ({ page }) => {
    const home: WikipediaHomePage = new WikipediaHomePage(page);
    const results: WikipediaSearchResultsPage = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('qwertyuiopasdf');

    const message: string = await results.getNoResultsMessage();
    expect(message.toLowerCase()).toContain('did not match any articles');
  });

});
