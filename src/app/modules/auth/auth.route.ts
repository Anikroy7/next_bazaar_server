import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AuthValidation } from "../auth/auth.validation";
import { AuthControllers } from "../auth/auth.controller";

const router = express.Router();


router.post(
  "/signin",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);
router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

router.post(
  '/refresh-token',
  // validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
