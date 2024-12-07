import express from "express";
import auth from "../../middlewares/auth";
import { CategoryControllers } from "./category.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories)
router.post('/', auth(UserRole.ADMIN), CategoryControllers.createCategory)
router.patch('/:categoryId', auth(UserRole.ADMIN), CategoryControllers.updateCategory)
router.get('/:categoryId', CategoryControllers.getCategory)
router.delete('/:categoryId', auth(UserRole.ADMIN), CategoryControllers.deleteCategory)

export const CategoryRoutes = router;
