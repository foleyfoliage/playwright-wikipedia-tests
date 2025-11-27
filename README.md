# Take-Home Task

## Goal

This small project is a starting template.  
Your task is to:

1. Complete the tests in `tests/wikipedia.spec.ts`:
   - Implement the Wikipedia search flow.
   - Assert that the result page contains the text **"software testing"**.
   - Implement a check that verifies a **network/API request** was made during the flow.
2. (Optional) Add one **negative/edge-case test** of your choice.
3. A basic GitHub Actions workflow is provided You may improve or leave it as-is.

You may refactor, restructure, or add helper functions/files if you feel it's appropriate.

---

## Tech

- [Playwright](https://playwright.dev/)
- TypeScript

You are free to adjust configuration as long as the tests are runnable via:

```bash
npm install
npx playwright install
npm test
