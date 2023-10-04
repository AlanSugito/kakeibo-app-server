import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./logger";
import multer from "multer";
import storage from "./storage";

const startServer = () => {
  const app = express();
  const upload = multer({ storage });

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello from server");
  });

  const PORT = 4000;

  app.listen(PORT, () => logger.info(`Server running at port: ${PORT}`));
};

export default startServer;
