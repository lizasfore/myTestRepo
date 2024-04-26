import { Locator, Page } from "@playwright/test";
import { config } from "dotenv";
import { CommFunc } from "../../helpers/commonFunctions";
import { Timeout } from "../enum/timeout.enum";

config();

export class LoginPage extends CommFunc {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.locator("#Email");
    this.passwordField = page.locator("#Password");
    this.loginBtn = page.locator("//button[contains(text(), 'Log in')]");
  }

  async navigateToLogin() {
    await this.page.goto(`${process.env.BASE_APP_URL}/login`);
  }

  async emailFieldInput() {
    await this.emailField.waitFor({ timeout: Timeout.PAGE });
    await this.emailField.fill(`${process.env.USER_EMAIL}`);
  }

  async passwordFieldInput() {
    await this.passwordField.waitFor({ state: "visible" });
    await this.passwordField.fill(`${process.env.USER_PASSWORD}`);
  }

  async loginBtnClick() {
    await this.loginBtn.click();
    await this.page.waitForTimeout(2000);
  }
}
