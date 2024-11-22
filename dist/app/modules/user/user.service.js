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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
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
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const hashedPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.password, 11);
    const userData = {
        email: (_a = payload === null || payload === void 0 ? void 0 : payload.admin) === null || _a === void 0 ? void 0 : _a.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
    };
    const adminData = payload === null || payload === void 0 ? void 0 : payload.admin;
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUserData = yield transactionClient.user.create({
            data: userData,
        });
        const createdAdminData = yield transactionClient.admin.create({
            data: adminData,
        });
        return {
            user: createdUserData,
            admin: createdAdminData,
        };
    }));
    return result;
});
exports.UserServices = {
    getAllUsers,
    createAdmin,
};
