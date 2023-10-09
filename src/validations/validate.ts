import Joi from "joi";
import { APIError } from "../utils";
import { logger } from "../configs";

const validate = (data: unknown, schema: Joi.Schema) => {
  const result = schema.validate(data);

  if (result.error) {
    logger.error(result.error?.message);
    throw new APIError(400, result.error.message);
  }
  return result.value;
};

export default validate;
