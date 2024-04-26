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
  readonly DateOfBirthField: Locator;
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
    this.DateOfBirthField = page.locator("#PatientDateOfBirth");
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

  async createSuperBillsBtnClick() {
    await this.createSuperBillsBtn.click();
  }

  async sbStatusFieldInput() {
    await this.sbStatusField.click();
    await this.statusClosedOption.click();
  }

  async totalFieldInput() {
    await this.totalField.click();
    await this.totalField.fill("0.15");
  }

  async dateOfServiceFieldInput() {
    await this.dateOfServiceField.click();
    await this.dateOfServiceField.fill("26.04.2024");
  }

  async memberIdFieldInput() {
    await this.memberIdField.click();
    await this.totalField.fill("COVIDxx");
  }

  async firstNameInput() {
    await this.firstNameField.click();
    await this.firstNameField.fill("Elizabeth");
  }

  async lastNameInput() {
    await this.lastNameField.click();
    await this.lastNameField.fill("Bekker");
  }

  async dateOfBirthFieldInput() {
    await this.lastNameField.click();
    await this.lastNameField.fill("Bekker");
  }

  async phoneFieldInput() {
    await this.phoneField.click();
    await this.phoneField.fill("+17545517768");
  }

  async socialSecNumberFieldInput() {
    await this.socialSecNumberField.click();
    await this.phoneField.fill("100-00-1111");
  }

  async streetFieldInput() {
    await this.streetField.click();
    await this.streetField.fill("Vilyamsa 81");
  }

  async cityFieldInput() {
    await this.cityField.click();
    await this.cityField.fill("San Antonio");
  }

  async stateFieldInput() {
    await this.stateField.click();
    await this.stateField.fill("TX");
  }

  async zipFieldInput() {
    await this.zipField.click();
    await this.zipField.fill("79123");
  }

  async providerFieldInput() {
    await this.providerField.click();
    await this.providerOption.click();
  }

  async dataProviderFieldInput() {
    await this.dataProviderField.click();
    await this.dataProviderOption.click();
  }

  async createBtnClick() {
    await this.createBtn.click();
  }
}
