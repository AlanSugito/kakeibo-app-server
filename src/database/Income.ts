import Formatter from "../utils/Formatter";
import User from "./User";
import { prisma } from "../configs";
import { IIncome, IIncomeQuery } from "../types";
import { APIError } from "../utils";
import { checkUser } from "./utils";

class Income {
  async addIncome(userId: string, data: IIncome) {
    const isUserExist = await checkUser(userId);

    if (!isUserExist) throw new APIError(404, "user not found");

    const { day, month, year } = Formatter.splitDate(data.date);
    try {
      const income = await prisma.income.create({
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

      const incomes = await prisma.income.findMany({
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

      const total = await prisma.income.aggregate({
        _sum: { nominal: true },
        where: { year: query.year, month: query.month },
      });

      const totalRecords = await prisma.income.count({
        where: { user_id: userId },
      });

      return {
        incomes,
        totalRecords,
        total: Math.round(total._sum.nominal as number),
      };
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getAveragePerMonth(userId: string, year: number) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const result = await prisma.income.aggregate({
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

      const incomes = await prisma.income.findMany({
        where: {
          user_id: userId,
          created_at: { gte: from, lte: to },
        },
        select: {
          date: true,
          month: true,
          year: true,
          nominal: true,
          information: true,
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

      const incomes = await prisma.income.findMany({
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

      const result = await prisma.income.delete({
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
