import { prisma } from "../configs";
import { ICategory, ICategoryQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class Category {
  private categories = prisma.category;

  async create(data: ICategory) {
    try {
      const isUserExist = await checkUser(data.user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const category = await this.categories.create({
        data,
      });

      return category;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async get(userId: string, query: ICategoryQuery = {}) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const dataPerPage = 10;
      const categories = await this.categories.findMany({
        where: {
          OR: [
            { user_id: userId, description: { contains: query.search } },
            { user_id: userId, name: { contains: query.search } },
          ],
        },
        take: dataPerPage,
      });

      return categories;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async update(categoryId: string, data: ICategory) {
    try {
      const isUserExist = await checkUser(data.user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const result = await this.categories.update({
        where: { user_id: data.user_id, id: categoryId },
        data,
      });

      return result;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async delete(categoryId: string) {
    try {
      const result = await this.categories.delete({
        where: { id: categoryId },
      });

      return result;
    } catch (error) {
      throw APIError.throw(error);
    }
  }
}

export default new Category();
