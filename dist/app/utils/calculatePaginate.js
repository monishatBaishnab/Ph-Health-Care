"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculatePaginate = (options) => {
    const page = Number(options === null || options === void 0 ? void 0 : options.page) || 1;
    const limit = Number(options === null || options === void 0 ? void 0 : options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = (options === null || options === void 0 ? void 0 : options.sortBy) || "createdAt";
    const sortOrder = (options === null || options === void 0 ? void 0 : options.sortOrder) || "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.default = calculatePaginate;
