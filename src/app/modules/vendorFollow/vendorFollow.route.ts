import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { vendorFollowValidationSchema } from "./vendorFollow.validation";
import { VendorFollowController } from "./vendorFollow.controller";


const router = express.Router();

router.post('/isFollowed', auth(UserRole.ADMIN, UserRole.CUSTOMER), validateRequest(vendorFollowValidationSchema), VendorFollowController.isFollowed);

router.post('/add', auth(UserRole.ADMIN, UserRole.CUSTOMER), validateRequest(vendorFollowValidationSchema), VendorFollowController.addVendorFollower);

router.post('/remove', auth(UserRole.ADMIN, UserRole.CUSTOMER), validateRequest(vendorFollowValidationSchema), VendorFollowController.removeVendorFollower)

export const VendorFollowRoutes = router;
