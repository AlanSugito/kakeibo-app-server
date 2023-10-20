import { prisma } from "../configs";
import { ICategory, ICategoryQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class Category {
  private async checkCategory(categoryId: string) {
    try {
      const category = await prisma.category.findFirst({
        where: { id: categoryId },
      });

      if (!category) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async create(data: ICategory) {
    try {
      const isUserExist = await checkUser(data.user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const category = await prisma.category.create({
        data,
      });

      return category;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async get(userId: string, query: ICategoryQuery = {}) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const dataPerPage = 10;
      const categories = await prisma.category.findMany({
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
      throw APIError.get(error);
    }
  }

  async update(categoryId: string, data: ICategory) {
    try {
      const isUserExist = await checkUser(data.user_id);
      const isCategoryExist = await this.checkCategory(categoryId);

      if (!isUserExist || !isCategoryExist)
        throw new APIError(404, "data not found");

      const result = await prisma.category.update({
        where: { user_id: data.user_id, id: categoryId },
        data,
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async delete(categoryId: string) {
    try {
      const isCategoryExist = await this.checkCategory(categoryId);

      if (!isCategoryExist) throw new APIError(404, "category not found");
      const result = await prisma.category.delete({
        where: { id: categoryId },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new Category();
