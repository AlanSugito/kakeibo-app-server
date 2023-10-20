import { google } from "googleapis";
import process from "./process";

const oauthClient = new google.auth.OAuth2(
  process.GOOGLE_CLIENT_ID,
  process.GOOGLE_CLIENT_SECRET,
  "http://localhost:4000/api/user/auth/login/google/callback"
);

export default oauthClient;
