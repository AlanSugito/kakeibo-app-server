interface IProfile {
  full_name: string;
  profile_picture: string;
  balance: number;
  average_income_in_a_month: number;
  average_spent_in_a_month: number;
  biggest_expenses: number;
  stats: {
    this_month_expenses: number[];
    most_spent_categories: {
      [key:string]: number[]
    }
  }
}

export type { IProfile }