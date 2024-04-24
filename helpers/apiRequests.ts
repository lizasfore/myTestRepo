import { Base } from "./base";
import Method from "./requestMethods";
import { config } from "dotenv";
config();

export class ApiRequests {
  async getLastMessage(cookieAuth: string) {
    const base = new Base();
    const headers = {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Cookie: cookieAuth,
    };
    const response = await base.request(
      Method.get(
        process.env.BASE_API_URL!,
        process.env.API_ENDPOINT_GET_MESSAGES!,
        "",
        headers
      )
    );
    return response;
  }

  async clientRespMessage(
    message: string,
    sender: string,
    reciver: string,
    cookieAuth: string
  ) {
    const base = new Base();
    const headers = {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`,
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Cookie: cookieAuth,
    };

    let data = new FormData();
    data.append("Body", `${message}`);
    data.append("To", `${reciver}`);
    data.append("From", `${sender}`);

    const response = await base.request(
      Method.post(
        process.env.BASE_API_URL!,
        process.env.API_ENDPOINT_GET_MESSAGES!,
        data,
        headers
      )
    );
    return response;
  }
}
