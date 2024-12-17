"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const vendorReview_sevice_1 = require("./vendorReview.sevice");
const createVendorReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorReviewData = req.body;
    const result = yield vendorReview_sevice_1.VendorReviewSerives.createVendorReviewIntoDB(vendorReviewData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor review created successfully",
        data: result,
    });
}));
const getAllVendorReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendorReview_sevice_1.VendorReviewSerives.getAllVendorReviewsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Vendor reviews retrived successfully",
        data: result,
    });
}));
const getVendorReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const result = yield vendorReview_sevice_1.VendorReviewSerives.getSingleVendorReviewsFromDB(vendorId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Vendor review retrieved successfully",
        data: result,
    });
}));
const updateVendorReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const result = yield vendorReview_sevice_1.VendorReviewSerives.updateVendorReviewIntoDB(reviewId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Vendor review updated successfully",
        data: result,
    });
}));
const deleteVendorReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const result = yield vendorReview_sevice_1.VendorReviewSerives.deleteVendorReviewFromDB(reviewId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Vendor review deleted successfully",
        data: result,
    });
}));
exports.VendorReviewController = {
    createVendorReview,
    getAllVendorReview,
    getVendorReview,
    updateVendorReview,
    deleteVendorReview
};
