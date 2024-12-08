import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { createProductReviewValidationSchema } from "./productReview.validation";
import { ProductReviewController } from "./productReview.controller";


const router = express.Router();

router.post('/', auth(UserRole.ADMIN, UserRole.CUSTOMER), validateRequest(createProductReviewValidationSchema), ProductReviewController.createProductReview)
router.get('/', auth(UserRole.ADMIN), ProductReviewController.getAllProductReview)
router.get('/:productId/:reviewId', auth(UserRole.ADMIN, UserRole.CUSTOMER), ProductReviewController.getProductReview)
router.patch('/:productId/:reviewId', auth(UserRole.ADMIN, UserRole.CUSTOMER), ProductReviewController.updateProductReview)
router.delete('/:productId/:reviewId', auth(UserRole.ADMIN, UserRole.CUSTOMER), ProductReviewController.deleteProductReview)


export const ProductReviewRoutes = router;
