import Formatter from "../utils/Formatter";
import User from "./User";
import { prisma } from "../configs";
import { IDate, IIncome, IIncomeQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class Income {
  private income = prisma.income;

  async addIncome(userId: string, data: IIncome) {
    const isUserExist = await checkUser(userId);

    if (!isUserExist) throw new APIError(404, "user not found");

    const { day, month, year } = Formatter.splitDate(data.date);
    try {
      const income = await this.income.create({
        data: { ...data, month, year, user_id: userId, date: day },
      });

      await User.addBalance(userId, data.nominal);

      return income;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async get(userId: string, query: IIncomeQuery = {}) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const dataPerPage: number = 10;

      const incomes = await this.income.findMany({
        where: {
          user_id: userId,
          information: { contains: query.search },
          month: query.month,
          year: query.year,
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

      return incomes;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getAveragePerMonth(userId: string, year: number) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const result = await this.income.aggregate({
        where: { user_id: userId, year },
        _avg: {
          nominal: true,
        },
      });
      const average = Math.round(result._avg.nominal!);
      return average;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getByDate(userId: string, from: Date, to: Date) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const incomes = await this.income.findMany({
        where: {
          user_id: userId,
          created_at: { gte: from, lte: to },
        },
      });

      return incomes;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getMonthlyStats(user_id: string, year: number) {
    try {
      const isUserExist = await checkUser(user_id);

      if (!isUserExist) throw new APIError(404, "user not found");

      const incomes = await this.income.findMany({
        where: { year, user_id },
        select: {
          month: true,
          year: true,
          nominal: true,
        },
      });

      return incomes;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async delete(userId: string, incomeId: string) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const result = await this.income.delete({
        where: { user_id: userId, id: incomeId },
      });

      if (!result) throw new APIError(404, "user not found");

      return result;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new Income();
