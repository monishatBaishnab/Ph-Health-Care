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
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAsync_1 = __importDefault(require("../../utils/handleAsync"));
const handleResponse_1 = __importDefault(require("../../utils/handleResponse"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginUser(req.body);
    res.cookie("refreshToken", result.refreshToken);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully.",
        data: result.token,
    });
}));
const refreshToken = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.refreshToken(req.cookies);
    res.cookie("refreshToken", result.refreshToken);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully.",
        data: result.token,
    });
}));
exports.AuthControllers = {
    loginUser,
    refreshToken
};
