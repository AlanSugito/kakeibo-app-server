import { logger, prisma } from "../configs";
import { IRegisterCredentials } from "../types";
import { APIError } from "../utils";

class User {
  async getUserById(id: string) {
    try {
      if (!id) {
        throw new APIError(400, "user id is required");
      }

      const user = await prisma.user.findFirst({
        where: { id },
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
