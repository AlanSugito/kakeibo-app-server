import { Income } from "../database";
import { IIncome, IIncomeQuery } from "../types";
import { APIError } from "../utils";

class IncomeService {
  private incomeRepository = Income;

  async addIncome(userId: string, data: IIncome) {
    try {
      const income = await this.incomeRepository.addIncome(userId, data);

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
}

export default new IncomeService();
