import { test, expect } from '@playwright/test';

test.describe('Wikipedia search - automation support task', () => {

  test('searches for "Quality Assurance" and opens first result', async ({ page }) => {
    // ✅ TODO 1: Navigate to the Wikipedia homepage

    // ✅ TODO 2: Enter "Quality Assurance" into the search field and submit
    // - Find the search input
    // - Type the query
    // - Trigger the search (press Enter or click search button)

    // ✅ TODO 3: Click the first search result
    // Make this selector as robust as you reasonably can.

    // ✅ TODO 4: Verify that the resulting page contains the text "software testing"
    // This should be a proper assertion using expect().
  });

  test('verifies that a Wikipedia API/network request is made during the flow', async ({ page }) => {
    // ✅ TODO 5: Set up a listener or waitForResponse to detect a Wikipedia API/network request.
    //
    // Example approaches:
    //  - page.on('request', ...) and filter by URL
    //  - page.waitForResponse(resp => resp.url().includes('wikipedia.org') && resp.request().resourceType() === 'xhr')
    //
    // This test should:
    //  1. Perform a similar search flow as above (or reuse a helper if you create one).
    //  2. Assert that at least one relevant network request was made.
  });
});