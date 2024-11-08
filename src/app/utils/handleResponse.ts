import { Response } from "express";

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null | undefined;
};

const handleResponse = <T>(res: Response, responseData: TResponseData<T>) => {
  const { success, statusCode, message, meta, data } = responseData;

  res.status(statusCode).send({
    success,
    statusCode,
    message,
    meta: meta || null,
    data: data || null,
  });
};

export default handleResponse;
