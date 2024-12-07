import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createAdminValidationSchema } from "./user.validation";

const router = express.Router();

router.post('/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)
router.post('/create-vender',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)



export const UsersRoutes = router;
