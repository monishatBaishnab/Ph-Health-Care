import { Prisma, PrismaClient } from "@prisma/client";
import calculatePaginate from "../../utils/calculatePaginate";

const prisma = new PrismaClient();

const findAllAdmins = async (query: Record<string, unknown>, options: Record<string, unknown>) => {
  const { searchTerm, ...filters } = query;
  const { limit, skip, sortBy, sortOrder } = calculatePaginate(options);
  const searchFields: string[] = ["name", "email"];
  const whoreConditions: Prisma.AdminWhereInput[] = [];

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
  
  const result = await prisma.admin.findMany({
    where: { AND: whoreConditions },
    skip: skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return result;
};

export const AdminServices = { findAllAdmins };
