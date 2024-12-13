import { z } from "zod";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    profileImage: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    status: z.enum(['blocked', 'active']).default('active'),
    isDeleted: z.boolean().default(false)
  }),
});
export const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    profileImage: z.string().optional(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    status: z.enum(['blocked', 'active']).default('active'),
    isDeleted: z.boolean().default(false)
  }),
});
export const createVendorValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().max(20),
    name: z.string(),
    phone: z.string(),
    logo: z.string(),
    location: z.string(),
    isBlacklisted: z.boolean().default(false),
    isDeleted: z.boolean().default(false)
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(['blocked', 'active']).default('active').optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
export const updateVendorValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    logo: z.string().optional(),
    location: z.string().optional(),
    isBlacklisted: z.boolean().default(false).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
export const updateCustomerValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.enum(['blocked', 'active']).default('active').optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const UserValidation = {
  createAdminValidationSchema,
  createVendorValidationSchema,
  updateAdminValidationSchema,
  updateVendorValidationSchema,
  updateCustomerValidationSchema
};
