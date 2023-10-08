import { prisma } from "../configs";
import { IExpense, IExpenseQuery } from "../types";
import { APIError } from "../utils";
import Formatter from "../utils/Formatter";
import User from "./User";
import { checkUser } from "./utils";

class Expense {
  private expenses = prisma.expense;

  async addExpense(userId: string, data: IExpense) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const { day, month, year } = Formatter.splitDate(new Date(data.date));
      const expense = await this.expenses.create({
        data: { ...data, month, year, date: day, user_id: userId },
      });

      try {
        await User.cutBalance(userId, data.nominal);
      } catch (error) {
        throw APIError.throw(error);
      }

      return expense;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async get(userId: string, query: IExpenseQuery = {}) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const dataPerPage: number = 10;

      const expenses = await this.expenses.findMany({
        where: {
          user_id: userId,
          information: { contains: query.search },
          year: query.years,
          month: query.month,
          category_id: { in: query.categories },
          expense_type_id: { in: query.expenseTypes },
        },
        include: {
          category: { select: { name: true } },
          expenseType: { select: { name: true } },
        },
        orderBy: [
          {
            date: "asc",
          },
          {
            year: "asc",
          },
        ],
        skip: query.page ? query.page * dataPerPage : 0,
        take: dataPerPage,
      });

      return expenses;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async getMonthlyStats(userId: string, year: number) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const data = await this.expenses.findMany({
        where: { user_id: userId, year },
        select: {
          month: true,
          year: true,
          nominal: true,
        },
      });

      return data;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async delete(userId: string, expenseId: string) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const result = await this.expenses.delete({
        where: { user_id: userId, id: expenseId },
      });

      return result;
    } catch (error) {
      throw APIError.throw(error);
    }
  }
}

export default new Expense();
