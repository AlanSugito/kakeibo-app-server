interface IExpenseType {
  user_id: string;
  name: string;
  description: string;
}

interface IExpenseTypeQuery {
  search?: string;
}

export type { IExpenseType, IExpenseTypeQuery };
