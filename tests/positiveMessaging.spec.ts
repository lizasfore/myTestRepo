import {
  test,
  expect,
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

let page: Page;
let context: BrowserContext;
let loginPage: LoginPage;
let mainPage: MainPage;
let sbViewPage: SuperBillViewPage;
let apiRequests: ApiRequests;
let commFunc: CommFunc;

test.beforeAll(async ({browser}) => {
  context = await browser.newContext();
  page = await context.newPage();

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
    async (c) => c.name === ".AspNetCore.eAffirmCookieAuth"
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

test("Patient sends a message to the server (1 - yes) and 'Bentley'", async () => {
  await test.step("Get first SMS message from the sequence", async () => {
    commFunc.checkFirstSequenceMessage(
      cookieAuth,
      messages.question_messages.everything_ok
    );
  });

  await test.step("Patient send a message (1 - yes)", async () => {
    const response = await apiRequests.clientRespMessage(
      "1",
      process.env.PATIENT_PHONE!,
      process.env.SERVER_PHONE!,
      cookieAuth
    );
    expect(response.data.status == 201).toBeTruthy();
  });

  await test.step("Server receives a message from the patient", async () => {
    commFunc.checkLastMessage(cookieAuth, "1");
  });

  await test.step("Server sends next message to the patient", async () => {
    commFunc.checkLastMessage(
      cookieAuth,
      messages.question_messages.name_validation
    );
  });

  await test.step("Patient send a message 'Bentley'", async () => {
    const response = await apiRequests.clientRespMessage(
      "Bentley",
      process.env.PATIENT_PHONE!,
      process.env.SERVER_PHONE!,
      cookieAuth
    );
    expect(response.data.status == 201).toBeTruthy();
    console.log(response.data.data.body);
  });

  await test.step("Server receives a message from the patient", async () => {
    commFunc.checkLastMessage(cookieAuth, "Bentley");
  });

  await test.step("Server sends next message to the patient", async () => {
    commFunc.checkLastMessage(cookieAuth, "ending en");
  });
});

// test.afterAll(async ({browser}) => {
//   await browser.close();
// });
