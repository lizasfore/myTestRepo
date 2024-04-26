import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "allure-playwright",

  timeout: 60 * 1000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: "https://eaffirm-v5-staging.azurewebsites.net",
    headless: true,
    viewport: { width: 2048, height: 1536 },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: "application/vnd.github.v3+json",
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        browserName: "chromium",

        //Chrome Browser Config
        channel: "chrome",

        //Browser height and width
        // viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,

        //Enable File Downloads in Chrome
        acceptDownloads: true,
        // storageState: './tests/auth/defaultStorageState.json',

        //Slows down execution by ms
        launchOptions: {
          args: [
            "--start-maximized",
            "--disable-web-security",
            "--no-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--window-size=1900,1000",
            "--allow-insecure-localhost",
            "--ignore-certificate-error",
          ],
          // slowMo: 50
        },
      },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
