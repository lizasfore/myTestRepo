import { expect, Locator, Page } from "@playwright/test";
import { config } from "dotenv";
import { ApiRequests } from "./apiRequests";

config();

// let apiRequests: ApiRequests;

export class testDataCreation {
  page: Page;
  readonly createSuperBillsBtn: Locator;
  readonly viewSuperBillsBtn: Locator;
  readonly sbStatusField: Locator;
  readonly totalField: Locator;
  readonly dateOfServiceField: Locator;
  readonly memberIdField: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly dateOfBirthField: Locator;
  readonly phoneField: Locator;
  readonly socialSecNumberField: Locator;
  readonly streetField: Locator;
  readonly cityField: Locator;
  readonly stateField: Locator;
  readonly zipField: Locator;
  readonly providerField: Locator;
  readonly dataProviderField: Locator;
  readonly providerOption: Locator;
  readonly statusClosedOption: Locator;
  readonly dataProviderOption: Locator;
  readonly createBtn: Locator;

  maxAttempts: number;
  interval: number;

  constructor(page: Page) {
    this.page = page;
    this.viewSuperBillsBtn = page.locator("//a[@href='/SuperBills']");
    this.createSuperBillsBtn = page.locator("//a[.= ' Create Super Bill']");
    this.sbStatusField = page.locator("#Conversation_Status");
    this.statusClosedOption = page.locator("//option[@value='Closed']");
    this.totalField = page.locator("#Total");
    this.dateOfServiceField = page.locator("#DateOfService");
    this.memberIdField = page.locator("#MemberId");
    this.firstNameField = page.locator("#PatientFirstName");
    this.lastNameField = page.locator("#PatientLastName");
    this.dateOfBirthField = page.locator("#PatientDateOfBirth");
    this.phoneField = page.locator("#PatientPhone");
    this.socialSecNumberField = page.locator("#PatientSocialSecurityNumber");
    this.streetField = page.locator("#PatientStreet");
    this.cityField = page.locator("#PatientCity");
    this.stateField = page.locator("#PatientState");
    this.zipField = page.locator("#PatientZip");
    this.providerField = page.locator("#ProviderNpi");
    this.dataProviderField = page.locator("#DataProviderId");
    this.providerOption = page.locator("//option[@value='1234567891']");
    this.dataProviderOption = page.locator("//option[@value='11']");
    this.createBtn = page.locator("//input[@type='submit']");

    this.maxAttempts = 40;
    this.interval = 1000;
    // apiRequests = new ApiRequests();
  }
  /**
   * create SuperBill
   * @returns A promise that resolves when creation of the SuperBill is successfull.
   */
  async createSuperBillForTests() {
    await this.createSuperBillsBtn.click();
    await this.sbStatusField.click();
    await this.statusClosedOption.click();
    await this.totalField.fill("0.15");
    await this.dateOfServiceField.fill("26.04.2024");
    await this.memberIdField.fill("COVIDxx");
    await this.firstNameField.fill("Elizabeth");
    await this.lastNameField.fill("Bekker");
    await this.dateOfBirthField.fill("19.06.2003");
    await this.phoneField.fill("+17545517768");
    await this.socialSecNumberField.fill("100-00-1111");
    await this.streetField.fill("Vilyamsa 81");
    await this.cityField.fill("San Antonio");
    await this.stateField.fill("TX");
    await this.zipField.fill("79123");
    await this.providerField.click();
    await this.providerOption.click();
    await this.dataProviderField.click();
    await this.dataProviderOption.click();
    await this.createBtn.click();
  }
}
