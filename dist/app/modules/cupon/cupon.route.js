"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const cupon_controller_1 = require("./cupon.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), cupon_controller_1.CuponControllers.createCupon);
router.get('/', cupon_controller_1.CuponControllers.getAllCupons);
router.patch('/:cuponId', cupon_controller_1.CuponControllers.updateCupon);
router.delete('/:cuponId', cupon_controller_1.CuponControllers.deleteCupon);
exports.CuponRoutes = router;