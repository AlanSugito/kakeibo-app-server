import { logger, prisma } from "../configs";
import { IRegisterCredentials } from "../types";
import { APIError } from "../utils";

interface IUserQuery {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  token?: string;
}

class User {
  async getBy(query: IUserQuery) {
    try {
      const user = await prisma.user.findFirst({
        where: query,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          balance: true,
          profile_picture: true,
        },
      });

      if (!user) {
        throw new APIError(404, "user not found");
      }

      return user;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getUserCredentials(email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          token: true,
        },
      });

      if (!user) {
        throw new APIError(404, "user not found");
      }

      return user;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async save(data: IRegisterCredentials) {
    try {
      const user = await prisma.user.findFirst({
        where: { email: data.email },
      });

      if (user) {
        throw new APIError(400, "Email is already in use");
      }

      const result = await prisma.user.create({
        data,
        select: {
          id: true,
        },
      });
      logger.info("User registered");
      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async setToken(id: string, token: string | null) {
    try {
      const result = await prisma.user.update({
        where: { id },
        data: { token },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async addBalance(id: string, nominal: number) {
    try {
      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) throw new APIError(404, "user not found");

      const result = await prisma.user.update({
        where: { id },
        data: {
          balance: user.balance! + nominal,
        },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }
  async cutBalance(id: string, nominal: number) {
    try {
      const user = await prisma.user.findFirst({ where: { id } });

      if (!user) throw new APIError(404, "user not found");

      const result = await prisma.user.update({
        where: { id },
        data: {
          balance: user.balance! - nominal,
        },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async updateProfilePicture(id: string, filename: string) {
    try {
      const result = await prisma.user.update({
        where: { id },
        data: { profile_picture: filename },
      });

      if (!result) {
        throw new APIError(404, "user not found");
      }

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async deleteById(id: string) {
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new User();
