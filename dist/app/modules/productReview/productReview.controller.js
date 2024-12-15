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
exports.ProductReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const productReview_service_1 = require("./productReview.service");
const createProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productReviewData = req.body;
    const result = yield productReview_service_1.ProductReviewSerives.createProductReviewIntoDB(productReviewData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product review created successfully",
        data: result,
    });
}));
const getAllProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productReview_service_1.ProductReviewSerives.getAllProductReviewsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product reviews retrived successfully",
        data: result,
    });
}));
const getProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, productId } = req.params;
    const result = yield productReview_service_1.ProductReviewSerives.getSingleProductReviewsFromDB(reviewId, productId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product review retrieved successfully",
        data: result,
    });
}));
const updateProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, productId } = req.params;
    const result = yield productReview_service_1.ProductReviewSerives.updateProductReviewIntoDB(reviewId, productId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product review updated successfully",
        data: result,
    });
}));
const deleteProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, productId } = req.params;
    const result = yield productReview_service_1.ProductReviewSerives.deleteProductReviewFromDB(reviewId, productId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product review deleted successfully",
        data: result,
    });
}));
exports.ProductReviewController = {
    createProductReview,
    getAllProductReview,
    getProductReview,
    updateProductReview,
    deleteProductReview
};
