interface IExpense {
  date: string | Date;
  nominal: number;
  category_id: string;
  expense_type_id: string;
  information: string;
}

interface IExpenseQuery {
  month?: string;
  years?: number;
  categories?: string[];
  expenseTypes?: string[];
  page?: number;
  search?: string;
}

export type { IExpense, IExpenseQuery };
