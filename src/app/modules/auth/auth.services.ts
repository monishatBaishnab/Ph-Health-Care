import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { localConfig } from "../../../config";
import { jwtHelpers } from "../../utils/jwtHelpers";
import emailSender from "./emailSender";
import { Secret } from "jsonwebtoken";
import httpError from "../../errors/httpError";
import httpStatus from "http-status";
const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  const isPasswordValid = await bcrypt.compare(payload.password, userData.password);

  if (!isPasswordValid) {
    throw new Error("Password not matched.");
  }

  const tokenData = jwtHelpers.generateTokenData(userData);

  const token = jwtHelpers.generateToken(tokenData, localConfig.jwt_secret as string);

  const refreshToken = jwtHelpers.generateToken(tokenData, localConfig.jwt_secret as string, "30d");

  return { token, refreshToken };
};

const refreshToken = async (payload: { refreshToken: string }) => {
  const validateToken = jwtHelpers.verifyToken(
    payload.refreshToken,
    localConfig.jwt_secret as string
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: validateToken?.email },
  });

  const tokenData = jwtHelpers.generateTokenData(userData);

  const token = jwtHelpers.generateToken(tokenData, localConfig.jwt_secret as string);

  const refreshToken = jwtHelpers.generateToken(tokenData, localConfig.jwt_secret as string, "30d");

  return { token, refreshToken };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: "ACTIVE" },
  });
  const tokenData = jwtHelpers.generateTokenData(userData);

  const token = jwtHelpers.generateToken(tokenData, localConfig.jwt_secret as string);
  const resetPassLink = localConfig.reset_pass_link + `/id=${userData.id}&token=${token}`;

  await emailSender(
    "baishnabmonishat@gmail.com",
    `
    <div>
        <p>Click for reset password.</p>
        <a href='${resetPassLink}'>
            <button>Click hare.</button>
        </a>
    </div>
    `
  );

  return "Reset link sent on email.";
};

const resetPassword = async (token: string, payload: { password: string; id: string }) => {
  if (!token) {
    throw new httpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
  }
  const verifiedToken = jwtHelpers.verifyToken(token, localConfig.jwt_secret as Secret);
  if (!verifiedToken) {
    throw new httpError(httpStatus.FORBIDDEN, "Forbidden.");
  }

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: payload.password,
    },
  });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
};
