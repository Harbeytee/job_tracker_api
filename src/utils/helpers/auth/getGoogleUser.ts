const { BadRequestError } = require("../../../utils/errors");
import config from "../../../config/config";
import { HttpHelper } from "../requests/httpHelper";

export default async function getGoogleUser(access_token: string) {
  try {
    // Fetch user profile using access_token
    const userInfoResponse = await HttpHelper.get(config.google.userInfoUrl!, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return userInfoResponse.data;
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.error_description ||
      "Failed to fetch user profile from Google";
    throw new BadRequestError(errMsg);
  }
}
