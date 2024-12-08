import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { VendorReviewController } from "./vendorReview.controller";
import { createVendorReviewValidationSchema } from "./vendorReview.validation";


const router = express.Router();

router.post('/', auth(UserRole.ADMIN, UserRole.CUSTOMER), validateRequest(createVendorReviewValidationSchema), VendorReviewController.createVendorReview)
router.get('/', auth(UserRole.ADMIN), VendorReviewController.getAllVendorReview)
router.get('/:vendorId/:reviewId', auth(UserRole.ADMIN, UserRole.VENDOR), VendorReviewController.getVendorReview)
router.patch('/:vendorId/:reviewId', auth(UserRole.ADMIN, UserRole.VENDOR), VendorReviewController.updateVendorReview)
router.delete('/:vendorId/:reviewId', auth(UserRole.ADMIN, UserRole.VENDOR), VendorReviewController.deleteVendorReview)


export const VendorReviewRoutes = router;
