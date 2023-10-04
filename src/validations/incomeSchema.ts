import Joi from "joi";
import { IIncome } from "../types";

const incomeSchema = Joi.object<IIncome>({
  date: Joi.string().isoDate().required(),
  nominal: Joi.number().min(0).required(),
  information: Joi.string().required(),
});

export default incomeSchema;
