import { test } from '../config/global/setup';
import { expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/wikipedia';

test.describe('Wikipedia search - performance', () => {

  test('search for "Quality Assurance" completes under 2 seconds', async ({ page }) => {
    const home = new WikipediaHomePage(page);
    await home.gotoHome();

    const startTime = Date.now();
    await home.search('Quality Assurance');
    const endTime = Date.now();

    const duration = endTime - startTime;
    console.log(`Search completed in ${duration}ms`);

    expect(duration).toBeLessThan(2000);
  });

  test('opening first search result should be fast', async ({ page }) => {
    const home = new WikipediaHomePage(page);

    await home.gotoHome();
    await home.search('Quality Assurance');

    const startTime = Date.now();
    const results = await home.searchAndOpenFirstResult('Quality Assurance');
    const endTime = Date.now();

    const duration = endTime - startTime;
    console.log(`Opening first result completed in ${duration}ms`);

    expect(duration).toBeLessThan(2500);
    await results.assertPageContains('software testing');
  });

});
