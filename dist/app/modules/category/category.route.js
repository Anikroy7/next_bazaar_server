"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const category_controller_1 = require("./category.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/', category_controller_1.CategoryControllers.getAllCategories);
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryControllers.createCategory);
router.patch('/:categoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryControllers.updateCategory);
router.get('/:categoryId', category_controller_1.CategoryControllers.getCategory);
router.delete('/:categoryId', (0, auth_1.default)(client_1.UserRole.ADMIN), category_controller_1.CategoryControllers.deleteCategory);
//!TEMP
router.post("/many", category_controller_1.CategoryControllers.insertMany);
//!TEMP
exports.CategoryRoutes = router;
