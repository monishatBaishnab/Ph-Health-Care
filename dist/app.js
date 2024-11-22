"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const handleNotFound_1 = __importDefault(require("./app/middlewares/handleNotFound"));
const handleGlobalError_1 = __importDefault(require("./app/middlewares/handleGlobalError"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send({
        success: true,
        statusCode: 200,
        message: "Welcome to PH Health Care Server...",
    });
});
app.use("/api/v1", routes_1.AppRoutes);
app.use("*", handleNotFound_1.default);
app.use(handleGlobalError_1.default);
exports.default = app;
