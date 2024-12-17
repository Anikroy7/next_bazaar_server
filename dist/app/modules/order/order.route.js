"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), order_controller_1.OrderControllers.createOrder);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), order_controller_1.OrderControllers.getAllOrders);
router.post("/my-order", order_controller_1.OrderControllers.getMyOrder);
router.get("/my-order", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), order_controller_1.OrderControllers.getMySingleOrder);
router.get("/vendor-order/:vendorId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), order_controller_1.OrderControllers.getVendorOrder);
router.get('/:orderId', order_controller_1.OrderControllers.getOrder);
router.patch('/:orderId', order_controller_1.OrderControllers.updateOrder);
exports.OrderRoutes = router;
