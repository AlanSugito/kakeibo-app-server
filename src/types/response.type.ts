interface IResponse<T = any> {
  message: string;
  data?: T;
}

interface IErrorResponse {
  message: string;
}

export type { IResponse, IErrorResponse };
