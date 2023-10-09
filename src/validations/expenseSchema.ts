import Joi from "joi";
import { IExpense } from "../types";

const expenseSchema = Joi.object<IExpense>({
  date: Joi.date()
    .required()
    .messages({ "date.base": "Date should be a valid date format" }),
  nominal: Joi.number()
    .min(0)
    .required()
    .messages({ "number.min": "Expense nominal cannot be a minus number" }),
  category_id: Joi.string()
    .required()
    .messages({ "string.empty": "Category id is required" }),
  expense_type_id: Joi.string()
    .required()
    .messages({ "string.empty": "Expense type id is required" }),
  information: Joi.string()
    .required()
    .messages({
      "string.empty": "Expense information is required",
      "string.base": "Expense information is required",
    }),
});

export default expenseSchema;
