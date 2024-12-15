"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorReviewValidation = exports.vendorFollowValidationSchema = void 0;
const zod_1 = require("zod");
exports.vendorFollowValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.number(),
        customerId: zod_1.z.number(),
    }),
});
exports.VendorReviewValidation = {
    vendorFollowValidationSchema: exports.vendorFollowValidationSchema
};
