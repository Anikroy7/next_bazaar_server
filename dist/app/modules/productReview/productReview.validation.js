"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewValidation = exports.createProductReviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProductReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.number(),
        customerId: zod_1.z.number(),
        description: zod_1.z.string(),
        ratings: zod_1.z.number()
    }),
});
exports.ProductReviewValidation = {
    createProductReviewValidationSchema: exports.createProductReviewValidationSchema
};
