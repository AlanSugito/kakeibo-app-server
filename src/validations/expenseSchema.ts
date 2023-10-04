import Joi from "joi";
import { IExpense } from "../types";

const expenseSchema = Joi.object<IExpense>({
  date: Joi.string().isoDate().required(),
  nominals: Joi.number().min(0).required(),
  category_id: Joi.string().required(),
  expense_type_id: Joi.string().required(),
  information: Joi.string().required(),
});

export default expenseSchema;
