import { AT_SECRET, RT_SECRET, oauthClient } from "../configs";
import { User } from "../database";
import { ILoginCredentials, IRegisterCredentials } from "../types";
import { APIError, Cryptographer } from "../utils";
import { loginSchema, registerSchema, validate } from "../validations";
import { google } from "googleapis";

class AuthService {
  async register(credentials: IRegisterCredentials) {
    try {
      await validate(credentials, registerSchema);
      const encryptedPassword = await Cryptographer.hash(credentials.password);

      const user = await User.save({
        ...credentials,
        password: encryptedPassword,
      });
      return user;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async login(credentials: ILoginCredentials) {
    try {
      await validate(credentials, loginSchema);

      const user = await User.getUserCredentials(credentials.email);

      const passwordIsValid = await Cryptographer.compare(
        credentials.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new APIError(400, "Email or Password is not valid");
      }

      const data = { userid: user.id };
      const refreshToken = Cryptographer.createToken(data, RT_SECRET);
      const accessToken = Cryptographer.createToken(data, AT_SECRET);

      await User.setToken(user.id, refreshToken);

      return { refreshToken, accessToken };
    } catch (error) {
      throw APIError.get(error);
    }
  }

  getOauthUrl() {
    try {
      const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ];

      const generatedURL = oauthClient.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
      });

      return generatedURL;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async loginWithOAuth2(code: string) {
    try {
      const { tokens } = await oauthClient.getToken(code as string);

      oauthClient.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauthClient,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      if (!data) {
        throw new APIError(500, "Internal Server Error!");
      }

      let refreshToken: string;
      let userId: string = "";
      try {
        const user = await User.getBy({ email: data.email! });
        refreshToken = Cryptographer.createToken(
          { userid: user.id },
          RT_SECRET
        );
        userId = user.id;
      } catch (error) {
        const { email, given_name, family_name, picture } = data;
        const user = await User.save({
          email: email!,
          first_name: given_name!,
          last_name: family_name!,
          password: "",
        });

        await User.updateProfilePicture(user.id, picture!);
        refreshToken = Cryptographer.createToken(
          { userid: user.id },
          RT_SECRET
        );
        userId = user.id;
      }

      await User.setToken(userId, refreshToken);

      return refreshToken;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getAccessToken(refreshToken: string) {
    try {
      const decodedToken = await Cryptographer.decodeToken(
        refreshToken,
        RT_SECRET
      );

      const newAccessToken = Cryptographer.createToken(
        { userid: decodedToken.userid },
        AT_SECRET
      );

      return newAccessToken;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new AuthService();
