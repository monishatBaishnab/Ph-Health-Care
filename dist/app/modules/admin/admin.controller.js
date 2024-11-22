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
exports.AdminControllers = void 0;
const admin_service_1 = require("./admin.service");
const handleAsync_1 = __importDefault(require("../../utils/handleAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const handleResponse_1 = __importDefault(require("../../utils/handleResponse"));
const http_status_1 = __importDefault(require("http-status"));
const findAllAdmins = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["name", "email", "searchTerm", "contactNumber"]);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield admin_service_1.AdminServices.findAllAdminsFromDb(filters, options);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Admins data retrieved successfully.",
        data: result.data,
        meta: result.meta,
    });
}));
const findSingleAdmin = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.findSingleAdminFromDb(id);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Admin retrieved successfully.",
        data: result,
    });
}));
const updateAdmin = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.updateAdminFromDb(id, req.body);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Admin updated successfully.",
        data: result,
    });
}));
const deleteAdmin = (0, handleAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.deleteAdminFromDb(id);
    (0, handleResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Admin deleted successfully.",
        data: result,
    });
}));
exports.AdminControllers = { findAllAdmins, findSingleAdmin, updateAdmin, deleteAdmin };
