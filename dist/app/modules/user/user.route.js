"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-admin', 
// auth(UserRole.ADMIN),
(0, validateRequest_1.default)(user_validation_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
router.post('/create-vendor', (0, validateRequest_1.default)(user_validation_1.createVendorValidationSchema), user_controller_1.UserControllers.createVendor);
router.post('/create-customer', (0, validateRequest_1.default)(user_validation_1.createCustomerValidationSchema), user_controller_1.UserControllers.createCustomer);
router.get('/me', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), user_controller_1.UserControllers.getMyInfo);
router.get('/vendor/all', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.getAllVendorInfo);
router.get('/cutomer/all', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.getAllCustomerInfo);
router.patch('/update-admin', (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.updateAdminValidationSchema), user_controller_1.UserControllers.updateAdmin);
router.patch('/update-vendor', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), (0, validateRequest_1.default)(user_validation_1.updateVendorValidationSchema), user_controller_1.UserControllers.updateVendor);
router.patch('/update-customer', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER), (0, validateRequest_1.default)(user_validation_1.updateCustomerValidationSchema), user_controller_1.UserControllers.updateCustomer);
router.get('/vendor/:id', user_controller_1.UserControllers.getSingleVendor);
router.patch('/update-vendor/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.updateVendorValidationSchema), user_controller_1.UserControllers.updateVendorById);
router.patch('/update-customer/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.updateCustomerValidationSchema), user_controller_1.UserControllers.updateCustomerById);
router.patch('/update-status/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.updateStatus);
router.patch('/update-role/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.updateRole);
router.patch('/vendor/blacklist/:id', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.UserControllers.vendorBlackList);
exports.UsersRoutes = router;
