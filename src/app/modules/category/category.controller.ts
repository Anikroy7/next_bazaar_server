import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CategoryServices } from "./category.service";
import { prisma } from "../../types/global";

const createCategory = catchAsync(async (req, res) => {
    const categoryData = req.body;
    const result = await CategoryServices.createCategoryIntoDB(categoryData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category created successfully",
        data: result,
    });
});
const getCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;

    const result = await CategoryServices.getCategoryFromDB(categoryId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category retrieved successfully",
        data: result,
    });
});
const updateCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const result = await CategoryServices.updateCategoryIntoDB(categoryId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category updated successfully",
        data: result,
    });
});
const deleteCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const result = await CategoryServices.deleteCategoryFromDB(categoryId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
        data: result,
    });
});

const getAllCategories = catchAsync(async (req, res) => {

    const result = await CategoryServices.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: result,
    });
});


//! temp
const insertMany = catchAsync(async (req, res) => {
    console.log('catetg', req.body)
    const newProduct = await prisma.category.createMany({
      data: req.body, // The array of products to insert
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category many successfully",
      data: newProduct,
    });
  });
  
  
  //! temp

export const CategoryControllers = {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    insertMany
};
