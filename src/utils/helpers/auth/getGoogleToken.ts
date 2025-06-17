import config from "../../../config/config";
import { BadRequestError } from "../../errors";

import { HttpHelper } from "../requests/httpHelper";

interface tokenResponse {
  data: {
    access_token: string;
  };
}

export default async function getGoogleToken(code: string) {
  const {
    google: { clientId, redirectUri, clientSecret },
  } = config;
  try {
    // Exchange authorization code for access token
    const tokenResponse: tokenResponse = await HttpHelper.post(
      config.google.tokenUrl!,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }
    );
    const token = tokenResponse.data;
    return token;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errMsg =
      err?.response?.data?.error_description || "Failed to exchange token";
    throw new BadRequestError(errMsg);
  }
}
