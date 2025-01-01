"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const product_route_1 = require("../modules/product/product.route");
const productReview_route_1 = require("../modules/productReview/productReview.route");
const vendorReview_route_1 = require("../modules/vendorReview/vendorReview.route");
const vendorFollow_route_1 = require("../modules/vendorFollow/vendorFollow.route");
const order_route_1 = require("../modules/order/order.route");
const payment_route_1 = require("../modules/payment/payment.route");
const cupon_route_1 = require("../modules/cupon/cupon.route");
const newsLetter_route_1 = require("../modules/newsletter/newsLetter.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UsersRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.CategoryRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductsRoutes,
    },
    {
        path: "/productReviews",
        route: productReview_route_1.ProductReviewRoutes,
    },
    {
        path: "/vendorReviews",
        route: vendorReview_route_1.VendorReviewRoutes,
    },
    {
        path: "/vendorFollowers",
        route: vendorFollow_route_1.VendorFollowRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/cupons",
        route: cupon_route_1.CuponRoutes,
    },
    {
        path: "/newsLetters",
        route: newsLetter_route_1.LetterRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
