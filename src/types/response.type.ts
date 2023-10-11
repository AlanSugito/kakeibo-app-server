interface IResponse<T> {
  message: string;
  data: T | null;
}

interface IErrorResponse {
  message: string;
}

export type { IResponse, IErrorResponse };
