"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleNotFound = (req, res) => {
    res.send({
        success: false,
        statusCode: 404,
        message: "Your requested api not found.",
        api: req === null || req === void 0 ? void 0 : req.baseUrl,
    });
};
exports.default = handleNotFound;
