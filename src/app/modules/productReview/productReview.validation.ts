import { z } from "zod";

export const createProductReviewValidationSchema = z.object({
  body: z.object({
    productId: z.number(),
    customerId: z.number(),
    description: z.string(),
    ratings: z.number()
  }),
});


export const ProductReviewValidation = {
  createProductReviewValidationSchema
};
