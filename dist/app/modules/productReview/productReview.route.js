"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const productReview_validation_1 = require("./productReview.validation");
const productReview_controller_1 = require("./productReview.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(productReview_validation_1.createProductReviewValidationSchema), productReview_controller_1.ProductReviewController.createProductReview);
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN), productReview_controller_1.ProductReviewController.getAllProductReview);
router.get('/:productId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), productReview_controller_1.ProductReviewController.getProductReview);
router.patch('/:reviewId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), productReview_controller_1.ProductReviewController.updateProductReview);
router.delete('/:reviewId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), productReview_controller_1.ProductReviewController.deleteProductReview);
exports.ProductReviewRoutes = router;
