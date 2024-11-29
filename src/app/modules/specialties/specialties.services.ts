import { PrismaClient, Specialty } from "@prisma/client";
import { TFile } from "../../interface/file";
import httpError from "../../errors/httpError";
import httpStatus from "http-status";
import { uploadHelpers } from "../../utils/uploadHelpers";

const prisma = new PrismaClient();

const fetchAllFromDB = async () => {
  return {};
};

const createOneIntoDB = async (payload: Specialty, file: TFile) => {
  if (!file) {
    throw new httpError(httpStatus.BAD_REQUEST, "Please select a specialties icon.");
  }
  const uploadedFile = await uploadHelpers.uploadToCloudinary(file);

  if (!uploadedFile) {
    throw new httpError(httpStatus.BAD_REQUEST, "File upload failed.");
  }

  const specialtyData = {
    title: payload.title,
    icon: uploadedFile.secure_url,
  };

  const createdSpecialty = await prisma.specialty.create({
    data: specialtyData,
  });

  return createdSpecialty;
};

const updateOneFromDB = async (id: string) => {
  return {};
};

const deleteOneFromDB = async (id: string) => {
  return {};
};

export const SpecialtiesServices = {
  fetchAllFromDB,
  createOneIntoDB,
  updateOneFromDB,
  deleteOneFromDB,
};
