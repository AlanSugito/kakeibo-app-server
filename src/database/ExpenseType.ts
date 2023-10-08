import { prisma } from "../configs";
import { IExpenseType, IExpenseTypeQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class ExpenseType {
  private expenseTypes = prisma.expenseType;

  async create(data: IExpenseType) {
    try {
      const isUserExist = await checkUser(data.user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const expenseType = await this.expenseTypes.create({
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
      const expenseTypes = this.expenseTypes.findMany({
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
      const expenseType = await this.expenseTypes.findFirst({
        where: { id: typeId },
      });

      if (!expenseType) throw new APIError(404, "expense type not found");

      const result = await this.expenseTypes.update({
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
      const expenseType = await this.expenseTypes.findFirst({
        where: { id: typeId },
      });

      if (!expenseType) throw new APIError(404, "expense type not found");

      const result = await this.expenseTypes.delete({
        where: { id: typeId },
      });

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new ExpenseType();
