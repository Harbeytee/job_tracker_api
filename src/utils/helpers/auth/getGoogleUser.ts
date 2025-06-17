import config from "../../../config/config";
import { IUser } from "../../../types/auth/interface";
import { BadRequestError } from "../../errors";
import { HttpHelper } from "../requests/httpHelper";

export default async function getGoogleUser(access_token: string) {
  try {
    // Fetch user profile using access_token
    const userInfoResponse = await HttpHelper.get(config.google.userInfoUrl!, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return userInfoResponse.data as IUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.error_description ||
      "Failed to fetch user profile from Google";
    throw new BadRequestError(errMsg);
  }
}
