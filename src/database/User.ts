import { logger, prisma } from "../configs";
import { ICredentials } from "../types";
import { APIError } from "../utils";

class User {
  private user = prisma.user;

  private throw(error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);
    }

    if (error instanceof APIError) {
      throw new APIError(error.status, error.message);
    }

    throw new APIError(500, "Internal Server Error");
  }

  async getUserById(id: string) {
    try {
      const user = await this.user.findFirst({
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
      throw this.throw(error);
    }
  }

  async getUserCredentials(id: string) {
    try {
      const user = await this.user.findFirst({
        where: { id },
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
      throw this.throw(error);
    }
  }

  async save(data: ICredentials) {
    try {
      const result = await this.user.create({
        data,
        select: {
          id: true,
        },
      });
      logger.info("User registered");
      return result;
    } catch (error) {
      throw this.throw(error);
    }
  }

  async updateProfilePicture(id: string, filename: string) {
    try {
      const result = await this.user.update({
        where: { id },
        data: { profile_picture: filename },
      });

      if (!result) {
        throw new APIError(404, "user not found");
      }

      return result;
    } catch (error) {
      throw this.throw(error);
    }
  }

  async deleteById(id: string) {
    try {
      await this.user.delete({ where: { id } });
      return true;
    } catch (error) {
      throw this.throw(error);
    }
  }
}

export default new User();
