"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleGlobalError = (err, req, res, next) => {
    var _a, _b;
    const statusCode = (_a = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _a !== void 0 ? _a : 401;
    const message = (_b = err === null || err === void 0 ? void 0 : err.name) !== null && _b !== void 0 ? _b : "Something want wrong.";
    const meta = [];
    console.log(err);
    res.status(statusCode).send(Object.assign({ success: false, statusCode: statusCode, message: message }, meta));
};
exports.default = handleGlobalError;
