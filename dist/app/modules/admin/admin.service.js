"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const client_1 = require("@prisma/client");
const calculatePaginate_1 = __importDefault(require("../../utils/calculatePaginate"));
const prisma = new client_1.PrismaClient();
const findAllAdminsFromDb = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filters = __rest(query, ["searchTerm"]);
    const { limit, skip, page, sortBy, sortOrder } = (0, calculatePaginate_1.default)(options);
    const searchFields = ["name", "email"];
    const whoreConditions = [{ isDeleted: false }];
    if (searchTerm) {
        whoreConditions.push({
            OR: searchFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (filters) {
        whoreConditions.push({
            AND: Object.keys(filters).map((key) => ({
                [key]: {
                    equals: filters[key],
                },
            })),
        });
    }
    const result = yield prisma.admin.findMany({
        where: { AND: whoreConditions },
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma.admin.count({
        where: { AND: whoreConditions },
    });
    return { data: result, meta: { limit, page, total } };
});
const findSingleAdminFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.admin.findUniqueOrThrow({
        where: { id, isDeleted: false },
    });
    const adminData = prisma.admin.findUnique({
        where: { id },
    });
    return adminData;
});
const updateAdminFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.admin.findUniqueOrThrow({
        where: { id, isDeleted: false },
    });
    const updatedAdminData = yield prisma.admin.update({
        where: { id },
        data: payload,
    });
    return updatedAdminData;
});
const deleteAdminFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.admin.findUniqueOrThrow({
        where: { id, isDeleted: false },
    });
    const deletedAdminData = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedAdmin = yield transactionClient.admin.update({
            where: { id },
            data: { isDeleted: true },
        });
        yield transactionClient.user.update({
            where: { email: deletedAdmin === null || deletedAdmin === void 0 ? void 0 : deletedAdmin.email },
            data: { status: "DELETED" },
        });
        return deletedAdmin;
    }));
    return deletedAdminData;
});
exports.AdminServices = {
    findAllAdminsFromDb,
    findSingleAdminFromDb,
    updateAdminFromDb,
    deleteAdminFromDb,
};
