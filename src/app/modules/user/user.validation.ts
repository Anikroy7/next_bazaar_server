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
    isDeleted:z.boolean().default(false)
  }),
});


export const UserValidation = {
  createAdminValidationSchema,
};
