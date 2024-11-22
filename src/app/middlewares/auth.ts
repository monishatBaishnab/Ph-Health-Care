import { NextFunction, Request, Response } from "express";
import httpError from "../errors/httpError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { localConfig } from "../../config";
import { UserRole } from "@prisma/client";
import handleAsync from "../utils/handleAsync";
import { jwtHelpers } from "../utils/jwtHelpers";

const auth = (...roles: string[]) => {
  return handleAsync((req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      console.log(token);
      throw new httpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }

    const verifiedUser = jwtHelpers.verifyToken(token, localConfig.jwt_secret as string);

    if (roles?.length && roles.includes(verifiedUser.role)) {
      req.user = verifiedUser;
      next();
    } else {
      throw new httpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }
  });
};

export default auth;
