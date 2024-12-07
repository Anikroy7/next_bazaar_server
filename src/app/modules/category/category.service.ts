import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { prisma } from "../../types/global";
;


const createCategoryIntoDB = async (payload: TCategory) => {
    const newCategory = await prisma.category.create({ data: payload });
    if (!newCategory) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create category");
    }
    return newCategory;
};
const getCategoryFromDB = async (_id: string) => {
    const category = await prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    return category;
};
const updateCategoryIntoDB = async (_id: string, payload: TCategory) => {
    const category = await prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = await prisma.category.update({
        where: {
            id: parseInt(_id)
        },
        data: payload
    });
    return updatedCategory;
};

const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany({});
    return categories;
};
const deleteCategoryFromDB = async (_id: string) => {
    const category = await prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = await prisma.category.update({
        where: { id: parseInt(_id) },
        data: {
            isDeleted: true
        }
    });
    return updatedCategory;
};
export const CategoryServices = {
    createCategoryIntoDB,
    deleteCategoryFromDB,
    getAllCategoriesFromDB,
    updateCategoryIntoDB,
    getCategoryFromDB
};
