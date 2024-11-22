"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_schema_1 = require("./admin.schema");
const router = (0, express_1.Router)();
router.get("/", admin_controller_1.AdminControllers.findAllAdmins);
router.get("/:id", admin_controller_1.AdminControllers.findSingleAdmin);
router.patch("/:id", (0, validateRequest_1.default)(admin_schema_1.adminSchemas.update), admin_controller_1.AdminControllers.updateAdmin);
router.delete("/:id", admin_controller_1.AdminControllers.deleteAdmin);
exports.AdminRoutes = router;
