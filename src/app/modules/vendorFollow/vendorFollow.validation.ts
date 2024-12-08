import { z } from "zod";

export const vendorFollowValidationSchema = z.object({
  body: z.object({
    vendorId: z.number(),
    customerId: z.number(),
  }),
});


export const VendorReviewValidation = {
  vendorFollowValidationSchema
};
