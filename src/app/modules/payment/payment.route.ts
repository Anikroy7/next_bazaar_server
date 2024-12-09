import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post(
  "/confirm", PaymentController.createPayment,
);

router.post(
  "/cancel", PaymentController.cancelPayment,
);

export const PaymentRoutes = router;
