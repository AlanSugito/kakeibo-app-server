import { Response, NextFunction } from "express";
import IncomeService from "../services/IncomeService";
import { IIncome, IRequest, IResponse } from "../types";
import { APIError, Formatter, removeFile } from "../utils";

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

  async getIncomesReport(req: IRequest, res: Response, next: NextFunction) {
    try {
      if (!req.query.from && !req.query.to)
        throw new APIError(400, "Dates is required!");

      const { from, to } = req.query;
      const parsedFrom = new Date(Number(from));
      const parsedTo = new Date(Number(to));
      const reportFile = await IncomeService.getIncomesReport(
        req.user,
        parsedFrom,
        parsedTo
      );

      res.attachment(reportFile);
      res.status(200).sendFile(
        reportFile,
        {
          root: "./",
        },
        (err) => {
          if (err) {
            throw new APIError(500, err.message);
          }

          removeFile(`./${reportFile}`);
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new IncomeController();
