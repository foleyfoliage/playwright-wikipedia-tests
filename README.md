# Playwright Wikipedia Tests

Automated end-to-end tests for Wikipedia using Playwright and TypeScript with a Page Object Model (POM) structure.

## Project Structure

```bash
playwright-wikipedia-tests/
├─ package.json
├─ playwright.config.ts
├─ README.md
├─ src
│  ├─ config/          # Environment and global setup
│  ├─ pages/           # Page Object Model classes
│  ├─ tests/           # Playwright test suites
│  ├─ types/           # Shared TypeScript types
│  └─ utils/           # Helper functions and hooks
```

## Requirements

* Node.js (v18 or higher recommended)
* npm
* Playwright

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Open Playwright interactive mode:

```bash
npx playwright
```

## Run Tests

Run all tests:

```bash
npm test
```

Run a single test file:

```bash
npx playwright test tests/test_wikipedia_search.spec.ts
```

Generate an HTML report:

```bash
npx playwright show-report
```

## Folder Overview

* **config/**: Global setup and environment variables
* **pages/**: Page Object Model classes for abstraction
* **tests/**: Test suites using POM
* **types/**: TypeScript interfaces and shared types
* **utils/**: Helper functions and hooks


## Test Results

```bash
> playwright test

Running 10 tests using 4 workers

  ✓   1 [firefox] › src/tests/wikipedia-performance.spec.ts:21:7 › Wikipedia search - performance › opening first search result should be fast (6.2s)
  ✓   2 [firefox] › src/tests/wikipedia-performance.spec.ts:7:7 › Wikipedia search - performance › search for "Quality Assurance" completes under 2 seconds (5.0s)
  ✓   3 [firefox] › src/tests/wikipedia-random-article.spec.ts:9:7 › Wikipedia search - edge cases › search with special characters returns no results (6.0s)
  ✓   4 [firefox] › src/tests/wikipedia-random-article.spec.ts:25:7 › Wikipedia search - edge cases › search with an extremely long string returns no results (4.6s)
No results message for long string: An error has occurred while searching: Search request is longer than the maximum allowed length. (Actual: 5000; allowed: 4096)
  ✓   5 [firefox] › src/tests/wikipedia-random-article.spec.ts:37:7 › Wikipedia search - edge cases › search is case-insensitive and works with mixed-case queries (4.2s)
Opening first result completed in 2048ms
Search completed in 1794ms
  ✓   6 [firefox] › src/tests/wikipedia-random-article.spec.ts:47:7 › Wikipedia search - edge cases › search for terms in different languages (4.0s)
  ✓   7 [firefox] › src/tests/wikipedia.spec.ts:13:7 › Wikipedia search - automation support task › searches for "Quality Assurance" and validates normalized text (4.5s)
No results message for special characters: There were no results matching the query.
No results message: There were no results matching the query.
  ✓   8 [firefox] › src/tests/wikipedia.spec.ts:23:7 › Wikipedia search - automation support task › verifies that a Wikipedia API/network request occurs during search (5.0s)
  ✓   9 [firefox] › src/tests/wikipedia.spec.ts:51:7 › Wikipedia search - automation support task › searching with a long nonsense string returns no results (3.0s)
  ✓  10 [firefox] › src/tests/wikipedia.spec.ts:68:7 › Wikipedia search - automation support task › searching with an empty string returns no results (2.7s)
No results message: an error has occurred while searching: search request is longer than the maximum allowed length. (actual: 303; allowed: 300)
Number of search results: 0
Detected 1 Wikipedia API/network request(s).

  10 passed (16.3s)
```
