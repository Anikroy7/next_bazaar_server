import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(

  "/", auth(UserRole.ADMIN, UserRole.CUSTOMER), OrderControllers.createOrder,
);

router.get(
  "/",  auth(UserRole.ADMIN), OrderControllers.getAllOrders,
);

router.post(
  "/my-order", OrderControllers.getMyOrder,
);

router.get(
  "/my-order", auth(UserRole.ADMIN, UserRole.CUSTOMER), OrderControllers.getMySingleOrder,
);
router.get(
  "/vendor-order/:vendorId", auth(UserRole.ADMIN, UserRole.VENDOR), OrderControllers.getVendorOrder,
);

router.get('/:orderId', OrderControllers.getOrder)
router.patch('/:orderId', OrderControllers.updateOrder)

export const OrderRoutes = router;
  