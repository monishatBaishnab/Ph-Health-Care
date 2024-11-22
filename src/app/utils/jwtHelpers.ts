import { User, UserRole } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";

type TTokenData = {
  email: string;
  id: string;
  role: UserRole;
  needPasswordChange: boolean;
};

const generateTokenData = (userData: User): TTokenData => {
  const tokenData = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    needPasswordChange: userData.needPasswordChange,
  };

  return tokenData;
};

const generateToken = (payload: TTokenData, secret: Secret, expiresIn = "1d"): string => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

const verifyToken = (token: string, secret: Secret): TTokenData => {
  const verifiedUser = jwt.verify(token, secret);
  return verifiedUser as TTokenData;
};

export const jwtHelpers = {
  generateTokenData,
  generateToken,
  verifyToken,
};
