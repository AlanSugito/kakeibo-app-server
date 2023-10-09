import Joi from "joi";
import { IIncome } from "../types";

const incomeSchema = Joi.object<IIncome>({
  date: Joi.date().required().messages({
    "date.base": "Date should be a valid date format",
  }),
  nominal: Joi.number().min(0).required().messages({
    "number.empty": "Income nominal is required",
    "number.min": "Nominal cannot be a minus number",
  }),
  information: Joi.string()
    .required()
    .messages({ "string.empty": "Income information is required" }),
});

export default incomeSchema;
