import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";
import { ILoginCredentials, IRegisterCredentials, IResponse } from "../types";
import { APIError, Cryptographer } from "../utils";
import { RT_SECRET, oauthClient } from "../configs";
import { google } from "googleapis";
import { User } from "../database";

class AuthController {
  async register(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const { data } = req.body;

      await AuthService.register(data as IRegisterCredentials);

      res.status(201).json({ message: "Succesfully registered" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response<IResponse>, next: NextFunction) {
    try {
      const { data } = req.body;

      const result = await AuthService.login(data as ILoginCredentials);
      const { refreshToken, ...cred } = result;

      res.cookie("rt", result.refreshToken, { httpOnly: true, sameSite: true });
      res.status(200).json({ message: "Successfully logged in", data: cred });
    } catch (error) {
      next(error);
    }
  }

  redirectToOAuth(_: Request, res: Response) {
    const url = AuthService.getOauthUrl();

    res.status(300).redirect(url);
  }

  async loginWithOAuth2(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const refreshToken = await AuthService.loginWithOAuth2(code as string);
      res.cookie("rt", refreshToken, { httpOnly: true, sameSite: true });

      res.status(300).redirect("http://localhost:5173");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { rt } = req.cookies;

      if (!rt) {
        res.clearCookie("rt", { httpOnly: true });
        return res.sendStatus(204);
      }

      try {
        const user = await User.getBy({ token: rt });
        await User.setToken(user.id, null);
      } catch (error) {
        res.clearCookie("rt", { httpOnly: true });
        return res.sendStatus(204);
      }

      res.clearCookie("rt", { httpOnly: true });
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
