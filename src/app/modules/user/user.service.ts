import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

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

const prisma = new PrismaClient();
const createAdmin = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload?.password, 11);
  const userData = {
    email: payload?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const adminData = payload?.admin;

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
