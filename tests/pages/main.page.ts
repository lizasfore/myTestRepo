import { Page } from "@playwright/test";
import { config } from "dotenv";
import { CommFunc } from "../../helpers/commonFunctions";
config();

export class MainPage extends CommFunc {
  constructor(page: Page) {
    super(page);
  }
}
