import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAdminValidationSchema, createCustomerValidationSchema, createVendorValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/create-admin',
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
  auth("ADMIN", "CUSTOMER", "VENDOR"),
  UserControllers.getMyInfo
)



export const UsersRoutes = router;
