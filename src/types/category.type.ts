interface ICategory {
  user_id: string;
  name: string;
  description: string;
}

interface ICategoryQuery {
  search?: string;
}

export type { ICategory, ICategoryQuery };
