import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  baseURL: 'https://en.wikipedia.org', // Correct property name
});
