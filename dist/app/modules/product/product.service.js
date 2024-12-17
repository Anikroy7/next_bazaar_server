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
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const product_constant_1 = require("./product.constant");
const paginationHelpers_1 = require("../../utils/paginationHelpers");
const getProductsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, priceRange } = params, filterData = __rest(params, ["searchTerm", "priceRange"]);
    const { page, limit, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const andCondions = [];
    if (searchTerm) {
        andCondions.push({
            OR: product_constant_1.productSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (priceRange) {
        andCondions.push({
            OR: [{
                    price: {
                        lte: parseInt(priceRange),
                    }
                }]
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: parseInt(filterData[key])
                }
            }))
        });
    }
    ;
    andCondions.push({
        isDeleted: false
    });
    const whereConditons = { AND: andCondions };
    const result = yield global_1.prisma.product.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        include: {
            category: true
        }
    });
    const total = yield global_1.prisma.product.count({
        where: whereConditons
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield global_1.prisma.product.create({
        data: payload
    });
    if (!newProduct) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Product");
    }
    return newProduct;
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
