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
exports.CuponServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
const createCuponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds } = payload, cuponData = __rest(payload, ["productIds"]);
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newCupon = yield transactionClient.cupon.create({
            data: cuponData
        });
        const cuponProducts = productIds.map((productId) => ({
            cuponId: newCupon.id,
            productId,
        }));
        yield transactionClient.cuponProduct.createMany({
            data: cuponProducts
        });
        return newCupon;
    }));
    return result;
});
const getAllCuponsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCupons = yield global_1.prisma.cupon.findMany({
        include: {
            cuponProduct: {
                include: {
                    product: true
                }
            }
        }
    });
    const cuponsWithAppliedProducts = allCupons.map(cupon => ({
        id: cupon.id,
        code: cupon.code,
        discountAmount: cupon.discountAmount,
        isActive: cupon.isActive,
        createdAt: cupon.createdAt,
        updatedAt: cupon.updatedAt,
        appliedProducts: cupon.cuponProduct.map(cuponProduct => cuponProduct.product)
    }));
    return cuponsWithAppliedProducts;
});
const updateCuponIntoDB = (cuponId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield global_1.prisma.cupon.findUnique({ where: { id: parseInt(cuponId) } });
    if (!cupon) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the cupon");
    }
    const result = yield global_1.prisma.cupon.update({
        where: {
            id: parseInt(cuponId)
        },
        data: data
    });
    return result;
});
const deleteCuponIntoDB = (cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const cupon = yield global_1.prisma.cupon.findUnique({ where: { id: parseInt(cuponId) } });
    if (!cupon) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the cupon");
    }
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.cuponProduct.deleteMany({
            where: {
                cuponId: cupon.id
            }
        });
        yield transactionClient.cupon.delete({
            where: {
                id: parseInt(cuponId)
            }
        });
    }));
    return result;
});
exports.CuponServices = {
    createCuponIntoDB,
    getAllCuponsFromDB,
    updateCuponIntoDB,
    deleteCuponIntoDB
};
