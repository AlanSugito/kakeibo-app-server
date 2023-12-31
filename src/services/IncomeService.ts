import { Income } from "../database";
import { IIncome, IIncomeQuery, IMonthlyStats } from "../types";
import { APIError, Formatter, parseStats, writeExcelFile } from "../utils";
import { incomeSchema, validate } from "../validations";

class IncomeService {
  private incomeRepository = Income;

  async addIncome(userId: string, data: IIncome) {
    try {
      const validatedData = await validate(data, incomeSchema);
      const income = await this.incomeRepository.addIncome(
        userId,
        validatedData as IIncome
      );

      return income;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getIncomes(userId: string, query: IIncomeQuery) {
    try {
      const incomes = await this.incomeRepository.get(userId, query);

      return incomes;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getIncomesReport(userId: string, from: Date, to: Date) {
    try {
      const incomes = await this.incomeRepository.getByDate("1", from, to);
      const fileName = `Incomes_${Formatter.formatDate(
        from
      )} - ${Formatter.formatDate(to)}.xlsx`;
      writeExcelFile(incomes, fileName);
      return fileName;
    } catch (error) {
      throw APIError.get(error);
    }
  }

  async getIncomesStats(userId: string, year: number): Promise<IMonthlyStats> {
    try {
      const data = await this.incomeRepository.getMonthlyStats(userId, year);
      const stats = parseStats(data);

      return stats;
    } catch (error) {
      throw APIError.get(error);
    }
  }
}

export default new IncomeService();
