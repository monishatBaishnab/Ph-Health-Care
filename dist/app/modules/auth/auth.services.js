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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUniqueOrThrow({
        where: { email: payload.email },
    });
    const isPasswordValid = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isPasswordValid) {
        throw new Error("Password not matched.");
    }
    const tokenData = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        needPasswordChange: userData.needPasswordChange,
    };
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.localConfig.jwt_secret, { expiresIn: "10m" });
    const refreshToken = jsonwebtoken_1.default.sign(tokenData, config_1.localConfig.jwt_secret, { expiresIn: "30d" });
    return { token, refreshToken };
});
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const validateToken = jsonwebtoken_1.default.verify(payload.refreshToken, config_1.localConfig.jwt_secret);
    const userData = yield prisma.user.findUniqueOrThrow({
        where: { email: validateToken === null || validateToken === void 0 ? void 0 : validateToken.email },
    });
    const tokenData = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        needPasswordChange: userData.needPasswordChange,
    };
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.localConfig.jwt_secret, { expiresIn: "10m" });
    const refreshToken = jsonwebtoken_1.default.sign(tokenData, config_1.localConfig.jwt_secret, { expiresIn: "30d" });
    return { token, refreshToken };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
