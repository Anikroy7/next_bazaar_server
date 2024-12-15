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
const caretePaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield global_1.prisma.payment.create({
        data: {
            orderId: parseInt(payload.orderId),
            paymentStatus: client_1.PaymentStatus.SUCCESS,
            transactionId: payload.tran_id,
        }
    });
});
const cancelOrderIntoDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    yield global_1.prisma.orderProduct.deleteMany({
        where: {
            orderId: parseInt(orderId)
        }
    });
    yield global_1.prisma.order.delete({
        where: { id: parseInt(orderId) }
    });
});
exports.PaymentServices = {
    caretePaymentIntoDB,
    cancelOrderIntoDB
};
