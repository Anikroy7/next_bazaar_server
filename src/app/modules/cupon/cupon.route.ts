import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CuponControllers } from "./cupon.controller";

const router = express.Router();

router.post('/', auth(UserRole.ADMIN, UserRole.VENDOR), CuponControllers.createCupon)
router.get('/', CuponControllers.getAllCupons)
router.patch('/:cuponId', CuponControllers.updateCupon)
router.delete('/:cuponId', CuponControllers.deleteCupon)

export const CuponRoutes = router;
