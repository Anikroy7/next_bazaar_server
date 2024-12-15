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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorFollowServices = void 0;
const global_1 = require("../../types/global");
const addFollowersIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.vendorFollow.create({
        data: payload
    });
    return result;
});
const removeFollowersIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.vendorFollow.delete({
        where: {
            vendorId_customerId: {
                vendorId: payload.vendorId,
                customerId: payload.customerId
            }
        }
    });
    return result;
});
exports.VendorFollowServices = {
    addFollowersIntoDB,
    removeFollowersIntoDB
};
