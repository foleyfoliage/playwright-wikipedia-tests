import { test, expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';
import { WikipediaSearchResultsPage } from '../pages/searchResult';

test.describe('Wikipedia search - automation support task', () => {

  test('searches for Quality Assurance and validates result contains "software testing"', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

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

    const home = new WikipediaHomePage(page);
    const results = new WikipediaSearchResultsPage(page);

    await home.gotoHome();
    await home.search('Quality Assurance');
    await results.openFirstResult();

    expect(
      networkRequests.some(url => url.includes('/w/api.php'))
    ).toBeTruthy();
  });
});
