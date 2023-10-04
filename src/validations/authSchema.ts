import Joi from "joi";
import { ICredentials } from "../types/credential.type";

const registerSchema = Joi.object<ICredentials>({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export { registerSchema, loginSchema } 