import { Admin, Prisma, PrismaClient } from "@prisma/client";
import calculatePaginate from "../../utils/calculatePaginate";

const prisma = new PrismaClient();

const findAllAdminsFromDb = async (
  query: Record<string, unknown>,
  options: Record<string, unknown>
) => {
  const { searchTerm, ...filters } = query;
  const { limit, skip, page, sortBy, sortOrder } = calculatePaginate(options);
  const searchFields: string[] = ["name", "email"];
  const whoreConditions: Prisma.AdminWhereInput[] = [{ isDeleted: false }];

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

  const total = await prisma.admin.count({
    where: { AND: whoreConditions },
  });

  return { data: result, meta: { limit, page, total } };
};

const findSingleAdminFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const adminData = prisma.admin.findUnique({
    where: { id },
  });

  return adminData;
};

const updateAdminFromDb = async (id: string, payload: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const updatedAdminData = await prisma.admin.update({
    where: { id },
    data: payload,
  });

  return updatedAdminData;
};

const deleteAdminFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const deletedAdminData = await prisma.$transaction(async (transactionClient) => {
    const deletedAdmin = await transactionClient.admin.update({
      where: { id },
      data: { isDeleted: true },
    });

    await transactionClient.user.update({
      where: { email: deletedAdmin?.email },
      data: { status: "DELETED" },
    });

    return deletedAdmin;
  });

  return deletedAdminData;
};

export const AdminServices = {
  findAllAdminsFromDb,
  findSingleAdminFromDb,
  updateAdminFromDb,
  deleteAdminFromDb,
};
