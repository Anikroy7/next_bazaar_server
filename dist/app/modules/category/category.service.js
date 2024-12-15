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
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
;
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield global_1.prisma.category.create({ data: payload });
    if (!newCategory) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create category");
    }
    return newCategory;
});
const getCategoryFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield global_1.prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the category");
    }
    return category;
});
const updateCategoryIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield global_1.prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = yield global_1.prisma.category.update({
        where: {
            id: parseInt(_id)
        },
        data: payload
    });
    return updatedCategory;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield global_1.prisma.category.findMany({
        where: {
            isDeleted: false
        }
    });
    return categories;
});
const deleteCategoryFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('delte jit', _id);
    const category = yield global_1.prisma.category.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = yield global_1.prisma.category.update({
        where: { id: parseInt(_id) },
        data: {
            isDeleted: true
        }
    });
    return updatedCategory;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    deleteCategoryFromDB,
    getAllCategoriesFromDB,
    updateCategoryIntoDB,
    getCategoryFromDB
};
