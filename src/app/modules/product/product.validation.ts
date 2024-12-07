import { z } from "zod";

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    categoryId: z.number(),
    vendorId: z.number(),
    inventoryCount: z.number(),
    price: z.number(),
    images: z.array(z.string()),
    discount: z.number()
  }),
});
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    categoryId: z.number().optional(),
    vendorId: z.number().optional(),
    inventoryCount: z.number().optional(),
    price: z.number().optional(),
    images: z.array(z.string()).optional(),
    discount: z.number().optional(),
  }),
});


export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
