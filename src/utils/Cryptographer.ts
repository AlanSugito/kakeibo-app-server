import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { logger } from "../configs";

class Cryptographer {
  createToken(data: { userid: string }, secret: string): string {
    const token = jwt.sign(data, secret, { expiresIn: "15 minutes" });
    return token;
  }

  decodeToken(token: string, secret: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(decodedToken as JwtPayload);
      });
    });
  }

  async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash(plainText, salt);

    return result;
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    try {
      const result = await bcrypt.compare(data, encrypted);
      return result;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new Cryptographer();
