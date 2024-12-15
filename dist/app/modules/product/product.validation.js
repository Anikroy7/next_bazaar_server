"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        categoryId: zod_1.z.number(),
        vendorId: zod_1.z.number(),
        inventorCount: zod_1.z.number(),
        price: zod_1.z.number(),
        images: zod_1.z.array(zod_1.z.string()),
        discount: zod_1.z.number()
    }),
});
exports.updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        categoryId: zod_1.z.number().optional(),
        vendorId: zod_1.z.number().optional(),
        inventorCount: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        discount: zod_1.z.number().optional(),
    }),
});
exports.ProductValidation = {
    createProductValidationSchema: exports.createProductValidationSchema,
    updateProductValidationSchema: exports.updateProductValidationSchema,
};
