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
        throw APIError.get(error);
      }

      return expense;
    } catch (error) {
      throw APIError.get(error);
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

      const total = await this.expenses.aggregate({
        _sum: { nominal: true },
        where: { year: query.years, month: query.month },
      });

      return { expenses, total: Math.round(total._sum.nominal as number) };
    } catch (error) {
      throw APIError.get(error);
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
      throw APIError.get(error);
    }
  }

  async getByDates(userId: string, from: Date, to: Date) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const expenses = await this.expenses.findMany({
        where: {
          user_id: userId,
          created_at: { gte: from, lte: to },
        },
      });

      return expenses;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getCurrentMonthExpenses(userId: string, year: number) {
    try {
      const expenses = await this.expenses.findMany({
        where: { user_id: userId, year },
        select: {
          date: true,
          nominal: true,
        },
      });

      return expenses;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getSpentCategories(userId: string, month: string, year: number) {
    try {
      const categories = this.expenses.findMany({
        where: { month, year, user_id: userId },
        select: { category: { select: { name: true } } },
      });

      return categories;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getAverageSpent(userId: string, year: number) {
    try {
      const result = await this.expenses.aggregate({
        where: { year, user_id: userId },
        _avg: { nominal: true },
      });

      return Math.round(result._avg.nominal as number);
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getBiggestExpenses(userId: string) {
    try {
      const result = await this.expenses.aggregate({
        where: { user_id: userId },
        _max: { nominal: true },
      });

      return result._max.nominal;
    } catch (error) {
      throw APIError.get(error);
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
      throw APIError.get(error);
    }
  }
}

export default new Expense();
