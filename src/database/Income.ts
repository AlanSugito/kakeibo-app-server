import { logger, prisma } from "../configs";
import { IIncome, IIncomeQuery } from "../types";
import { APIError } from "../utils";
import Formatter from "../utils/Formatter";
import User from "./User";
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
      throw APIError.throw(error);
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
        skip: query.page ? query.page * dataPerPage : 0,
        take: dataPerPage,
      });

      return incomes;
    } catch (error) {
      throw APIError.throw(error);
    }
  }

  async getAveragePerMonth(userId: string, year: number) {
    try {
      const isUserExist = await checkUser(userId);

      if (!isUserExist) throw new APIError(404, "user not found");

      const incomes = await this.income.findMany({
        where: { year, user_id: userId },
        select: { nominal: true },
      });

      const nominals = incomes.map((income) => income.nominal);
      const totalValue = nominals.reduce((a, b) => a + b, 0);
      const MONTHS_IN_A_YEAR = 12;
      const average = totalValue / MONTHS_IN_A_YEAR;
      return average;
    } catch (error) {
      throw APIError.throw(error);
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
      throw APIError.throw(error);
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
      throw APIError.throw(error);
    }
  }
}

export default new Income();
