import { Doctor, Prisma, PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { uploadHelpers } from "../../utils/uploadHelpers";
import { TFile } from "../../interface/file";
import { localConfig } from "../../../config";
import calculatePaginate from "../../utils/calculatePaginate";

const prisma = new PrismaClient();

const getAllUsers = async (query: Record<string, unknown>, options: Record<string, unknown>) => {
  const { searchTerm, ...filters } = query;
  const { limit, skip, page, sortBy, sortOrder } = calculatePaginate(options);
  const searchFields: string[] = ["email"];
  const whoreConditions: Prisma.UserWhereInput[] = [{ status: UserStatus.ACTIVE }];

  if (searchTerm) {
    whoreConditions.push({
      OR: searchFields.map((field) => ({
        [field]: {
          contains: searchTerm as string,
          mode: "insensitive",
        },
      })),
    });
  }

  if (filters) {
    whoreConditions.push({
      AND: Object.keys(filters).map((key) => ({
        [key]: {
          equals: filters[key] as string,
        },
      })),
    });
  }

  const result = await prisma.user.findMany({
    where: { AND: whoreConditions },
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: { AND: whoreConditions },
  });

  return { data: result, meta: { limit, page, total } };
};

const createAdmin = async (req: Request) => {
  const uploadedImage = await uploadHelpers.uploadToCloudinary(req.file as TFile);

  const payload = req.body;

  const hashedPassword = await bcrypt.hash(payload?.password, Number(localConfig.bcrypt_salt));
  const userData = {
    email: payload?.admin?.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const adminData = payload?.admin;

  if (uploadedImage?.secure_url) {
    adminData.profilePhoto = uploadedImage.secure_url;
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    await transactionClient.admin.create({
      data: adminData,
    });

    return createdUserData;
  });

  return result;
};

const createDoctorIntoDb = async (
  payload: { password: string; doctor: Doctor },
  file: TFile | undefined
) => {
  const uploadedImage = await uploadHelpers.uploadToCloudinary(file as TFile);

  const hashedPassword = await bcrypt.hash(payload?.password, Number(localConfig.bcrypt_salt));
  const userData = {
    email: payload?.doctor?.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const doctorData = payload?.doctor;

  if (uploadedImage?.secure_url) {
    doctorData.profilePhoto = uploadedImage.secure_url;
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });

    await transactionClient.doctor.create({
      data: doctorData,
    });

    return createdUserData;
  });

  return result;
};

export const UserServices = {
  getAllUsers,
  createAdmin,
  createDoctorIntoDb,
};
