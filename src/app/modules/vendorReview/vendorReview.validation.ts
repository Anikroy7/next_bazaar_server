import { z } from "zod";

export const createVendorReviewValidationSchema = z.object({
  body: z.object({
    vendorId: z.number(),
    customerId: z.number(),
    description: z.string(),
    ratings: z.number()
  }),
});


export const VendorReviewValidation = {
    createVendorReviewValidationSchema
};
