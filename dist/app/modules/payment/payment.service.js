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
exports.PaymentServices = void 0;
const client_1 = require("@prisma/client");
const global_1 = require("../../types/global");
const getPaymentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.payment.findMany({
        include: {
            order: true
        }
    });
    return result;
});
const createPaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield global_1.prisma.payment.create({
        data: {
            orderId: parseInt(payload.orderId),
            paymentStatus: client_1.PaymentStatus.SUCCESS,
            transactionId: payload.tran_id,
        }
    });
});
const cancelOrderIntoDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.orderProduct.deleteMany({
            where: {
                orderId: parseInt(orderId)
            }
        });
        yield transactionClient.payment.delete({
            where: {
                orderId: parseInt(orderId)
            }
        });
        yield transactionClient.order.delete({
            where: { id: parseInt(orderId) }
        });
    }));
    return result;
});
exports.PaymentServices = {
    createPaymentIntoDB,
    cancelOrderIntoDB,
    getPaymentsFromDB
};
