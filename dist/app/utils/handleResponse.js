"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleResponse = (res, responseData) => {
    const { success, statusCode, message, meta, data } = responseData;
    res.status(statusCode).send({
        success,
        statusCode,
        message,
        meta: meta || null,
        data: data || null,
    });
};
exports.default = handleResponse;
