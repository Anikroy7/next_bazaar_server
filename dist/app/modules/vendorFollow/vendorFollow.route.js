"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorFollowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const vendorFollow_validation_1 = require("./vendorFollow.validation");
const vendorFollow_controller_1 = require("./vendorFollow.controller");
const router = express_1.default.Router();
router.post('/add', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(vendorFollow_validation_1.vendorFollowValidationSchema), vendorFollow_controller_1.VendorFollowController.addVendorFollower);
router.delete('/remove', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(vendorFollow_validation_1.vendorFollowValidationSchema), vendorFollow_controller_1.VendorFollowController.removeVendorFollower);
exports.VendorFollowRoutes = router;
