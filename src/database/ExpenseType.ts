import { prisma } from "../configs";
import { IExpenseType, IExpenseTypeQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class ExpenseType {
  private async checkExpenseType(typeId: string) {
    try {
      const expenseType = await prisma.expenseType.findFirst({
        where: { id: typeId },
      });

      if (!expenseType) return false;

      return true;
    } catch {
      return false;
    }
  }

  async create(data: IExpenseType) {
    try {
      const isUserExist = await checkUser(data.user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const expenseType = await prisma.expenseType.create({
        data,
      });

      return expenseType;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async get(userId: string, query: IExpenseTypeQuery = {}) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");
      const expenseTypes = prisma.expenseType.findMany({
        where: {
          OR: [
            { user_id: userId, description: { contains: query.search } },
            { user_id: userId, name: { contains: query.search } },
          ],
        },
      });

      return expenseTypes;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async update(typeId: string, data: IExpenseType) {
    try {
      const isExpenseTypeExist = await this.checkExpenseType(typeId);

      if (!isExpenseTypeExist)
        throw new APIError(404, "expense type not found");

      const result = await prisma.expenseType.update({
        where: { id: typeId },
        data,
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async delete(typeId: string) {
    try {
      const isExpenseTypeExist = await this.checkExpenseType(typeId);

      if (!isExpenseTypeExist)
        throw new APIError(404, "expense type not found");

      const result = await prisma.expenseType.delete({
        where: { id: typeId },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new ExpenseType();
