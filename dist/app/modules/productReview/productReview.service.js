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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewSerives = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const createProductReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = payload, reviewData = __rest(payload, ["productId"]);
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const reviewInfo = yield transactionClient.review.create({ data: reviewData });
        yield transactionClient.productReview.create({
            data: {
                productId: productId,
                reviewId: reviewInfo.id
            }
        });
        return reviewInfo;
    }));
    return result;
});
const getAllProductReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.review.findMany({
        include: {
            customer: true,
        },
    });
    return result;
});
const getSingleProductReviewsFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const pr = yield global_1.prisma.productReview.findMany({
        where: {
            productId: parseInt(productId)
        },
        include: {
            review: {
                include: {
                    customer: true
                }
            },
        },
    });
    if (!pr) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the product reivew!");
    }
    return pr;
});
const updateProductReviewIntoDB = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.review.update({
        where: {
            id: parseInt(reviewId),
        },
        data: payload
    });
    return result;
});
const deleteProductReviewFromDB = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.productReview.deleteMany({
            where: {
                reviewId: parseInt(reviewId)
            }
        });
        yield transactionClient.review.delete({
            where: {
                id: parseInt(reviewId)
            }
        });
    }));
    return result;
});
exports.ProductReviewSerives = {
    getAllProductReviewsFromDB,
    createProductReviewIntoDB,
    getSingleProductReviewsFromDB,
    updateProductReviewIntoDB,
    deleteProductReviewFromDB
};
