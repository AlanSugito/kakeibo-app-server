import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, incomeRouter } from "../routers";
import { errorHandler } from "../middlewares";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(express.static("public"));

server.use("/api/user/auth", authRouter);
server.use("/api/incomes", incomeRouter);

server.use(errorHandler);

server.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

export default server;
