"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.updateCustomerValidationSchema = exports.updateVendorValidationSchema = exports.updateAdminValidationSchema = exports.createVendorValidationSchema = exports.createCustomerValidationSchema = exports.createAdminValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        name: zod_1.z.string(),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        status: zod_1.z.enum(['blocked', 'active']).default('active'),
        isDeleted: zod_1.z.boolean().default(false)
    }),
});
exports.createCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20),
        name: zod_1.z.string(),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        status: zod_1.z.enum(['blocked', 'active']).default('active'),
        isDeleted: zod_1.z.boolean().default(false)
    }),
});
exports.createVendorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().max(20),
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        logo: zod_1.z.string(),
        location: zod_1.z.string(),
        isBlacklisted: zod_1.z.boolean().default(false),
        isDeleted: zod_1.z.boolean().default(false)
    }),
});
exports.updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(['blocked', 'active']).default('active').optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.updateVendorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        logo: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        isBlacklisted: zod_1.z.boolean().default(false).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.updateCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(['blocked', 'active']).default('active').optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.UserValidation = {
    createAdminValidationSchema: exports.createAdminValidationSchema,
    createVendorValidationSchema: exports.createVendorValidationSchema,
    updateAdminValidationSchema: exports.updateAdminValidationSchema,
    updateVendorValidationSchema: exports.updateVendorValidationSchema,
    updateCustomerValidationSchema: exports.updateCustomerValidationSchema
};
