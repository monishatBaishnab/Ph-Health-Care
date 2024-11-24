import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { uploadHelpers } from "../../utils/uploadHelpers";
import { TFile } from "../../interface/file";
import httpError from "../../errors/httpError";
import httpStatus from "http-status";
import { localConfig } from "../../../config";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      admin: true,
    },

    where: {
      NOT: {
        admin: {
          isDeleted: true,
        },
      },
    },
  });
  return users;
};

const createAdmin = async (req: Request) => {
  const image = await uploadHelpers.uploadToCloudinary(req.file as TFile);

  const payload = JSON.parse(req.body?.data);
  
  const hashedPassword = await bcrypt.hash(payload?.password, Number(localConfig.bcrypt_salt));
  const userData = {
    email: payload?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const adminData = payload?.admin;

  if (image?.secure_url) {
    adminData.profilePhoto = image.secure_url;
  }

  console.log(adminData);
  console.log(userData);

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: adminData,
    });

    return {
      user: createdUserData,
      admin: createdAdminData,
    };
  });

  return result;
};

export const UserServices = {
  getAllUsers,
  createAdmin,
};
