import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { localConfig } from "../../../config";
const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  const isPasswordValid = await bcrypt.compare(payload.password, userData.password);

  if (!isPasswordValid) {
    throw new Error("Password not matched.");
  }

  const tokenData = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    needPasswordChange: userData.needPasswordChange,
  };

  const token = jwt.sign(tokenData, localConfig.jwt_secret as string, { expiresIn: "10m" });

  const refreshToken = jwt.sign(tokenData, localConfig.jwt_secret as string, { expiresIn: "30d" });

  return { token, refreshToken };
};

const refreshToken = async (payload: { refreshToken: string }) => {
  const validateToken = jwt.verify(payload.refreshToken, localConfig.jwt_secret as string) as {
    email: string;
    password: string;
  };

  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: validateToken?.email },
  });

  const tokenData = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    needPasswordChange: userData.needPasswordChange,
  };

  const token = jwt.sign(tokenData, localConfig.jwt_secret as string, { expiresIn: "10m" });

  const refreshToken = jwt.sign(tokenData, localConfig.jwt_secret as string, { expiresIn: "30d" });

  return { token, refreshToken };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
