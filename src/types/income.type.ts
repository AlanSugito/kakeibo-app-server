interface IIncome {
  date: Date | string;
  nominal: number;
  information: string;
}

interface IIncomeQuery {
  month?: string;
  year?: number;
  page?: number;
  search?: string;
}

export type { IIncome, IIncomeQuery };
