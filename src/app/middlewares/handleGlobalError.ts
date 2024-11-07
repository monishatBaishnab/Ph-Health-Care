import { NextFunction, Request, Response } from "express";

const handleGlobalError = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err?.statusCode ?? 401;
  const message: string = err?.name ?? "Something want wrong.";
  const meta: { name: string; message: string }[] = [];

  res.status(statusCode).send({
    success: false,
    statusCode: statusCode,
    message: message,
    ...meta,
  });
};

export default handleGlobalError;
