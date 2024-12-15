"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorReviewValidation = exports.createVendorReviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.createVendorReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.number(),
        customerId: zod_1.z.number(),
        description: zod_1.z.string(),
        ratings: zod_1.z.number()
    }),
});
exports.VendorReviewValidation = {
    createVendorReviewValidationSchema: exports.createVendorReviewValidationSchema
};
