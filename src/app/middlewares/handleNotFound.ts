import { Request, Response } from "express";

const handleNotFound = (req: Request, res: Response) => {
  res.send({
    success: false,
    statusCode: 404,
    message: "Your requested api not found.",
    api: req?.baseUrl,
  });
};

export default handleNotFound;
