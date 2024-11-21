import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AppRoutes } from "./app/routes";
import handleNotFound from "./app/middlewares/handleNotFound";
import handleGlobalError from "./app/middlewares/handleGlobalError";
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    statusCode: 200,
    message: "Welcome to PH Health Care Server...",
  });
});

app.use("/api/v1", AppRoutes);

app.use("*", handleNotFound);

app.use(handleGlobalError);

export default app;
