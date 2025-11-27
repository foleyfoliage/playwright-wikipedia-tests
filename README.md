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
