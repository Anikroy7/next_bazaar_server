"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(product_validation_1.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
//!TEMP
router.post("/many", product_controller_1.ProductControllers.insertMany);
//!TEMP
router.get("/", product_controller_1.ProductControllers.getProducts);
router.get("/:id", product_controller_1.ProductControllers.getSingleProduct);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(product_validation_1.updateProductValidationSchema), product_controller_1.ProductControllers.updateProduct);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), product_controller_1.ProductControllers.deleteProduct);
exports.ProductsRoutes = router;
