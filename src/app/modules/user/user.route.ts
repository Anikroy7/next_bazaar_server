import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAdminValidationSchema, createCustomerValidationSchema, createVendorValidationSchema, updateAdminValidationSchema, updateCustomerValidationSchema, updateVendorValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post('/create-admin',
  auth(UserRole.ADMIN),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)
router.post('/create-vendor',
  validateRequest(createVendorValidationSchema),
  UserControllers.createVendor
)
router.post('/create-customer',
  validateRequest(createCustomerValidationSchema),
  UserControllers.createCustomer
)

router.get('/me',
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  UserControllers.getMyInfo
)


router.patch('/update-admin',
  auth(UserRole.ADMIN),
  validateRequest(updateAdminValidationSchema),
  UserControllers.updateAdmin
)
router.patch('/update-vendor',
  auth(UserRole.ADMIN, UserRole.VENDOR),
  validateRequest(updateVendorValidationSchema),
  UserControllers.updateVendor
)
router.patch('/update-customer',
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  validateRequest(updateCustomerValidationSchema),
  UserControllers.updateCustomer
)


export const UsersRoutes = router;
