import { logger } from "../configs";

class APIError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static throw(error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);
    }

    if (error instanceof APIError) {
      throw new APIError(error.status, error.message);
    }

    throw new APIError(500, "Internal Server Error");
  }
}

export default APIError;
