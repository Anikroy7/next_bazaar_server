import { z } from "zod";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    profileImage: z.string(),
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
    profileImage: z.string(),
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


export const UserValidation = {
  createAdminValidationSchema,
  createVendorValidationSchema
};
