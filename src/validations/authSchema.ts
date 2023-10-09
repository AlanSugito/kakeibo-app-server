import Joi from "joi";
import { IRegisterCredentials } from "../types";

const registerSchema = Joi.object<IRegisterCredentials>({
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required!",
  }),
  last_name: Joi.string().empty("").optional(),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email format",
    "string.empty": "Email is required!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required!",
    "string.min": "Password must be at least 6 character or more",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email format",
    "string.empty": "Email is required!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required!",
    "string.min": "Password must be at least 6 character or more",
  }),
});

export { registerSchema, loginSchema };
