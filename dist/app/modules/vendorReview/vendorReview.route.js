"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const vendorReview_controller_1 = require("./vendorReview.controller");
const vendorReview_validation_1 = require("./vendorReview.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(vendorReview_validation_1.createVendorReviewValidationSchema), vendorReview_controller_1.VendorReviewController.createVendorReview);
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN), vendorReview_controller_1.VendorReviewController.getAllVendorReview);
router.get('/:vendorId/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), vendorReview_controller_1.VendorReviewController.getVendorReview);
router.patch('/:reviewId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), vendorReview_controller_1.VendorReviewController.updateVendorReview);
router.delete('/:reviewId', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), vendorReview_controller_1.VendorReviewController.deleteVendorReview);
exports.VendorReviewRoutes = router;
