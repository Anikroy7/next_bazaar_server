import express from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/all",
  auth(UserRole.ADMIN),
  PaymentController.getPayments);

router.post(
  "/confirm", PaymentController.createPayment,
);

router.patch(
  "/admin/cancel/:orderId", auth(UserRole.ADMIN), PaymentController.cancelPaymentByAdmin,

);
router.post(
  "/cancel", PaymentController.cancelPayment,
);




export const PaymentRoutes = router;
