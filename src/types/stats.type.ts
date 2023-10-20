interface IMonthlyStats {
  months: string[];
  values: number[];
}

interface ICategoryStats {
  categories: string[];
  values: number[];
}

export type { IMonthlyStats, ICategoryStats };
