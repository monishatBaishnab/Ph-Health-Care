"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.post("/login", auth_controllers_1.AuthControllers.loginUser);
router.post('/refresh-token', auth_controllers_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
