import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/", OrderControllers.createOrder,
);

router.get(
  "/", OrderControllers.getAllOrders,
);

router.post(
  "/my-order", OrderControllers.getMyOrder,
);

router.get(
  "/my-order",auth(UserRole.ADMIN, UserRole.CUSTOMER), OrderControllers.getMySingleOrder,
);

router.get('/:orderId',  OrderControllers.getOrder)
router.patch('/:orderId',  OrderControllers.updateOrder)

export const OrderRoutes = router;
