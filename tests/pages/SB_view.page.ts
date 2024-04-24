import { expect, Locator, Page } from "@playwright/test";
import { Timeout } from "../enum/timeout.enum";
import { CommFunc } from "../../helpers/commonFunctions";

export class SuperBillViewPage extends CommFunc {
  readonly resetBtn: Locator;
  readonly patientPhoneField: Locator;
  readonly searchBtn: Locator;
  readonly searchResult: Locator;
  readonly initiateSmsSequenceBtn: Locator;
  readonly sequenceStatus: Locator;
  readonly resetStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.patientPhoneField = page.locator("#PatientPhone");
    this.searchBtn = page.locator(".btn.btn-success");
    this.resetBtn = page.locator("//a[@href='/Conversations/Reset/2171']");
    this.searchResult = page.locator("//tr[@data-id='961023']");
    this.initiateSmsSequenceBtn = page.locator(
      "//a[@href='/Conversations/InitiateSms/2171']"
    );
    this.sequenceStatus = page.locator(
      "//tr[@data-id='961023']/td[@data-conversation-status]"
    );
    this.resetStatus = page.locator(
      "//a[@href='/Conversations/InitiateSms/2171']/following-sibling::span"
    );
  }

  async resetBtnClick() {
    await this.resetBtn.waitFor({ timeout: Timeout.BUTTON });
    await this.resetBtn.click();
    await this.waitForPageIsLoaded();
  }

  async patientPhoneFieldInput() {
    await this.patientPhoneField.click();
    await this.patientPhoneField.fill(`${process.env.PATIENT_PHONE}`);
  }

  async searchBtnClick() {
    await this.searchBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async checkSearchResultAccuracy() {
    expect(this.searchResult).toBeVisible();
  }

  async initiateSmsSequenceBtnClick() {
    await this.initiateSmsSequenceBtn.waitFor({ timeout: Timeout.BUTTON });
    await this.initiateSmsSequenceBtn.click();
    await this.waitForPageIsLoaded();
  }

  async getSequenceStatus() {
    // await this.sequenceStatus.waitFor({state: "visible"});
    return this.sequenceStatus.innerText();
  }
}
