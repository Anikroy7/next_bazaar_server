import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProductReviewSerives } from "./productReview.service";

const createProductReview = catchAsync(async (req, res) => {
    const productReviewData = req.body;
    const result = await ProductReviewSerives.createProductReviewIntoDB(productReviewData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product review created successfully",
        data: result,
    });
});

const getAllProductReview = catchAsync(async (req, res) => {
    const result = await ProductReviewSerives.getAllProductReviewsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product reviews retrived successfully",
        data: result,
    });
});

const getProductReview = catchAsync(async (req, res) => {
    const { reviewId, productId } = req.params;

    const result = await ProductReviewSerives.getSingleProductReviewsFromDB(reviewId, productId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Product review retrieved successfully",
        data: result,
    });
});
const updateProductReview = catchAsync(async (req, res) => {
    const { reviewId, productId } = req.params;

    const result = await ProductReviewSerives.updateProductReviewIntoDB(reviewId, productId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Product review updated successfully",
        data: result,
    });
});
const deleteProductReview = catchAsync(async (req, res) => {
    const { reviewId, productId } = req.params;

    const result = await ProductReviewSerives.deleteProductReviewFromDB(reviewId, productId );
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Product review deleted successfully",
        data: result,
    });
});

export const ProductReviewController = {
    createProductReview,
    getAllProductReview,
    getProductReview,
    updateProductReview,
    deleteProductReview
};
