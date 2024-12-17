"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/all", (0, auth_1.default)(client_1.UserRole.ADMIN), payment_controller_1.PaymentController.getPayments);
router.post("/confirm", payment_controller_1.PaymentController.createPayment);
router.patch("/admin/cancel/:orderId", (0, auth_1.default)(client_1.UserRole.ADMIN), payment_controller_1.PaymentController.cancelPaymentByAdmin);
router.post("/cancel", payment_controller_1.PaymentController.cancelPayment);
exports.PaymentRoutes = router;
