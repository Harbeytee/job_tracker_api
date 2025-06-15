import config from "../../../config/config";
const { BadRequestError } = require("../../../utils/errors");
import { HttpHelper } from "../requests/httpHelper";

export default async function getGoogleToken(code: string) {
  const {
    google: { clientId, redirectUri, clientSecret },
  } = config;
  try {
    // Exchange authorization code for access token
    const tokenResponse = await HttpHelper.post(config.google.tokenUrl!, {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });
    return tokenResponse.data;
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.error_description || "Failed to exchange token";
    throw new BadRequestError(errMsg);
  }
}
