interface IExpense {
  date: string | Date;
  nominals: number;
  category_id: string;
  expense_type_id: string;
  information: string;
}

export type { IExpense };
