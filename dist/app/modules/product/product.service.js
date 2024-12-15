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
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield global_1.prisma.product.create({
        data: payload
    });
    if (!newProduct) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Product");
    }
    return newProduct;
});
const getProductsFromDB = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const numberVendorId = parseInt(vendorId);
    const products = yield global_1.prisma.product.findMany({
        where: Object.assign({ isDeleted: false }, (numberVendorId && { vendorId: numberVendorId })),
        include: {
            vendor: true
        }
    });
    if (products.length === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "There are not products here");
    }
    return products;
    ;
});
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield global_1.prisma.product.findUnique({
        where: { id: parseInt(_id) },
        include: {
            vendor: true
        }
    });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the product");
    }
    if (product === null || product === void 0 ? void 0 : product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This car is already deleted");
    }
    return product;
});
const updateProductIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield global_1.prisma.product.findUnique({ where: { id: parseInt(_id) } });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the product");
    }
    if (product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This product is already deleted!!!");
    }
    const updatedProduct = yield global_1.prisma.product.update({
        where: { id: parseInt(_id) },
        data: payload
    });
    return updatedProduct;
});
const deleteProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield global_1.prisma.product.findUnique({ where: { id: parseInt(_id) } });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the product");
    }
    if (product === null || product === void 0 ? void 0 : product.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This product is already deleted!!");
    }
    yield global_1.prisma.product.update({
        where: { id: parseInt(_id) },
        data: { isDeleted: true }
    });
});
exports.ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    getSingleProductFromDB,
};
