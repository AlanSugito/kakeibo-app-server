import { Application, Router } from "express";
import { IncomeController } from "../controllers";

const router = Router();

router.post("/", IncomeController.addIncome as Application);
router.get("/", IncomeController.getIncomes as Application);

export default router;
