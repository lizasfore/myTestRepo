import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import { MainPage } from "./pages/main.page.js";
import { LoginPage } from "./pages/login.page.js";
import { SuperBillViewPage } from "./pages/SB_view.page.js";
import { ApiRequests } from "../helpers/apiRequests.js";
import { CommFunc } from "../helpers/commonFunctions.js";
import messages from "../helpers/messages.json";

export let cookieAuth: string = "";

let browser: Browser;
let context: BrowserContext;
let loginPage: LoginPage;
let mainPage: MainPage;
let sbViewPage: SuperBillViewPage;
let apiRequests: ApiRequests;
let commFunc: CommFunc;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  const page: Page = await context.newPage();

  loginPage = new LoginPage(page);
  mainPage = new MainPage(page);
  sbViewPage = new SuperBillViewPage(page);
  apiRequests = new ApiRequests();
  commFunc = new CommFunc(page);

  await loginPage.navigateToLogin();
  await loginPage.emailFieldInput();
  await loginPage.passwordFieldInput();
  await loginPage.loginBtnClick();

  const cookies = await context.cookies();
  const sessionCookie = cookies.find(
    (c) => c.name === ".AspNetCore.eAffirmCookieAuth"
  );
  console.log(sessionCookie!.value);
  cookieAuth = sessionCookie!.value;
});

test("Initiate SMS sequence and send SMS", async () => {
  await test.step("Search SuperBill", async () => {
    await mainPage.showMenuBtnClick();
    await mainPage.superBillsBtnClick();
    await mainPage.viewSuperBillsBtnClick();
    await sbViewPage.patientPhoneFieldInput();
    await sbViewPage.searchBtnClick();
    await expect(sbViewPage.searchResult).toBeVisible();
  });

  await test.step("Reset SuperBill", async () => {
    await sbViewPage.resetBtnClick();
    await expect
      .poll(
        async () => {
          const response = await sbViewPage.getSequenceStatus();
          return response;
        },
        {
          intervals: [1000, 2000],
          timeout: 10000,
        }
      )
      .toContain("Open");
  });

  await test.step("Initiate sequence and send SMS", async () => {
    await sbViewPage.initiateSmsSequenceBtnClick();
    await expect
      .poll(
        async () => {
          const response = await sbViewPage.getSequenceStatus();
          return response;
        },
        {
          intervals: [1000, 2000],
          timeout: 10000,
        }
      )
      .toContain("InProgress");
  });
});

const maxAttempts = 40; //TODO delete
const interval = 1000;

test("Patient sends a message to the server 'hello'", async () => {
  await test.step("Get first SMS message from the sequence", async () => {
    commFunc.checkFirstSequenceMessage(
      cookieAuth,
      messages.question_messages.everything_ok
    );
  });

  await test.step("Patient send a message 'hello'", async () => {
    const response = await apiRequests.clientRespMessage(
      "hello",
      process.env.PATIENT_PHONE!,
      process.env.SERVER_PHONE!,
      cookieAuth
    );
    expect(response.data.status == 201).toBeTruthy();
  });

  await test.step("Server receives a message from the patient", async () => {
    commFunc.checkLastMessage(cookieAuth, "hello");
  });

  await test.step("Server sends next message to the patient", async () => {
    commFunc.checkLastMessage(
      cookieAuth,
      messages.error_messages.interpret_error
    );
  });
});

test.afterAll(async () => {
  await browser.close();
});
