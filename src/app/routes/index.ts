import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UsersRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ProductsRoutes } from "../modules/product/product.route";
import {  ProductReviewRoutes } from "../modules/productReview/productReview.route";
import { VendorReviewRoutes } from "../modules/vendorReview/vendorReview.route";



const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/products",
    route: ProductsRoutes,
  },
  {
    path: "/productReviews",
    route: ProductReviewRoutes,
  },
  {
    path: "/vendorReviews",
    route: VendorReviewRoutes,
  },
    
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
