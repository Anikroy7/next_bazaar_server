import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { VendorReviewSerives } from "./vendorReview.sevice";

const createVendorReview = catchAsync(async (req, res) => {
    const vendorReviewData = req.body;
    const result = await VendorReviewSerives.createVendorReviewIntoDB(vendorReviewData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor review created successfully",
        data: result,
    });
});

const getAllVendorReview = catchAsync(async (req, res) => {
    const result = await VendorReviewSerives.getAllVendorReviewsFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor reviews retrived successfully",
        data: result,
    });
});

const getVendorReview = catchAsync(async (req, res) => {
    const { reviewId, vendorId } = req.params;
    const result = await VendorReviewSerives.getSingleVendorReviewsFromDB(reviewId, vendorId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Vendor review retrieved successfully",
        data: result,
    });
});
const updateVendorReview = catchAsync(async (req, res) => {
    const { reviewId, vendorId } = req.params;

    const result = await VendorReviewSerives.updateVendorReviewIntoDB(reviewId, vendorId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Vendor review updated successfully",
        data: result,
    });
});
const deleteVendorReview = catchAsync(async (req, res) => {
    const { reviewId, vendorId } = req.params;

    const result = await VendorReviewSerives.deleteVendorReviewFromDB(reviewId, vendorId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Vendor review deleted successfully",
        data: result,
    });
});

export const VendorReviewController = {
    createVendorReview,
    getAllVendorReview,
    getVendorReview,
    updateVendorReview,
    deleteVendorReview
};
