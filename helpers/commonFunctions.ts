import { expect, Locator, Page } from "@playwright/test";
import { config } from "dotenv";
import { ApiRequests } from "./apiRequests";

config();

let apiRequests: ApiRequests;

export class CommFunc {
  page: Page;
  readonly superBillsBtn: Locator;
  readonly viewSuperBillsBtn: Locator;
  readonly showMenuBtn: Locator;
  maxAttempts: number;
  interval: number;

  constructor(page: Page) {
    this.page = page;
    this.superBillsBtn = page.locator("//a[.=' Super Bills ']");
    this.viewSuperBillsBtn = page.locator("//a[@href='/SuperBills']");
    this.showMenuBtn = page.locator(".show-menu");
    this.maxAttempts = 40;
    this.interval = 1000;
    apiRequests = new ApiRequests();
  }

  async navigate(path: string = process.env.BASE_APP_URL!) {
    await this.page.goto(path);
    await this.waitForPageIsLoaded();
  }

  async waitForPageIsLoaded() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async showMenuBtnClick() {
    await this.showMenuBtn.first().waitFor({ state: "visible" });
    await this.showMenuBtn.first().click();
    await this.page.waitForTimeout(500);
  }

  async superBillsBtnClick() {
    if (!this.superBillsBtn) {
      await this.showMenuBtn.click();
    }
      await this.superBillsBtn.click();
  }

  async viewSuperBillsBtnClick() {
    await this.viewSuperBillsBtn.click();
  }

  async checkFirstSequenceMessage(cookieAuth: string, message: string) {
    const checkResponse = async (): Promise<boolean> => {
      let attempts = 0;

      while (attempts < this.maxAttempts) {
        const response = await apiRequests.getLastMessage(cookieAuth);
        const respMessage = response.data.data.messages[0];

        if (
          respMessage.body === message &&
          respMessage.status === "received" &&
          response.data.status === 200 &&
          respMessage.to == process.env.PATIENT_PHONE &&
          respMessage.from == process.env.SERVER_PHONE
        ) {
          console.log("Expected respMessage received:", respMessage.body);
          return true;
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, this.interval));
      }

      throw new Error(
        "Expected respMessage not received within the time limit"
      );
    };

    return await expect(checkResponse()).resolves.toBe(true);
  }

  async checkLastMessage(cookieAuth: string, message: string) {
    const checkResponse = async (): Promise<boolean> => {
      let attempts = 0;

      while (attempts < this.maxAttempts) {
        if (typeof apiRequests.getLastMessage !== "function") {
          console.error("getLastMessage not properly defined");
          return false;
        } else if (!apiRequests) {
          console.error("apiRequests is not properly defined");
          return false;
        }

        const response = await apiRequests.getLastMessage(cookieAuth);
        const respMessage = response.data.data.messages[0];

        if (
          respMessage.body === message &&
          respMessage.status === "received" &&
          response.data.status === 200
        ) {
          console.log("Expected respMessage received:", respMessage.body);
          return true;
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, this.interval));
      }

      throw new Error(
        "Expected respMessage not received within the time limit"
      );
    };

    await expect(checkResponse()).resolves.toBe(true);
  }
}
