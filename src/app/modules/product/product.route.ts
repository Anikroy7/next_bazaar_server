import express from "express";

import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  validateRequest(createProductValidationSchema),
  ProductControllers.createProduct
);
//!TEMP
router.post(
  "/many",
  
  ProductControllers.insertMany
);
//!TEMP


router.get("/", ProductControllers.getProducts);

router.get("/:id",
  ProductControllers.getSingleProduct
);
router.patch(
  "/:id",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  validateRequest(updateProductValidationSchema),
  ProductControllers.updateProduct
);

router.delete("/:id",
  auth(UserRole.VENDOR, UserRole.ADMIN),
  ProductControllers.deleteProduct
);



export const ProductsRoutes = router;
