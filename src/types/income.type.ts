interface IIncome {
  date: Date | string;
  nominal: number;
  information: string;
  created_at?: Date;
}

interface IIncomeQuery {
  month?: string;
  year?: number;
  page?: number;
  search?: string;
}

export type { IIncome, IIncomeQuery };
