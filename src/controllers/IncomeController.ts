import { Response, NextFunction } from "express";
import IncomeService from "../services/IncomeService";
import { IIncome, IRequest, IResponse } from "../types";

class IncomeController {
  async addIncome(
    req: IRequest,
    res: Response<IResponse<IIncome>>,
    next: NextFunction
  ) {
    try {
      const { data } = req.body;
      await IncomeService.addIncome(req.user, data);

      res.status(201).json({ message: "Succesfully added income" });
    } catch (error) {
      next(error);
    }
  }

  async getIncomes(
    req: IRequest,
    res: Response<IResponse>,
    next: NextFunction
  ) {
    try {
      const incomes = await IncomeService.getIncomes(req.user, req.query);

      res
        .status(200)
        .json({ message: "Successfully retrieve data", data: incomes });
    } catch (error) {
      next(error);
    }
  }
}

export default new IncomeController();
