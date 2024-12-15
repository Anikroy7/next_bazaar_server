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
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const generateRandom_1 = require("../../utils/generateRandom");
const payment_utils_1 = require("../payment/payment.utils");
const client_1 = require("@prisma/client");
const global_1 = require("../../types/global");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderData, productData } = payload;
    const userInfo = yield global_1.prisma.customer.findUnique({
        where: {
            id: orderData.customerId
        }
    });
    if (!userInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This user is not exists!!");
    }
    const vendorInfo = yield global_1.prisma.vendor.findUnique({
        where: {
            id: orderData.vendorId
        }
    });
    if (!vendorInfo) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This vendor is not exists!!");
    }
    try {
        const transactionId = (0, generateRandom_1.generateTransactionId)();
        const newOrder = yield global_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const orderInfo = yield transactionClient.order.create({
                data: orderData
            });
            productData.forEach((data) => __awaiter(void 0, void 0, void 0, function* () {
                yield global_1.prisma.orderProduct.create({
                    data: {
                        orderId: orderInfo.id,
                        productId: data.id,
                        quantity: data.quantity
                    }
                });
            }));
            return orderInfo;
        }));
        const paymentInfo = {
            transactionId,
            totalPrice: orderData.totalPrice,
            user: {
                _id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                address: userInfo.address,
                phone: userInfo.phone
            },
            orderId: newOrder.id,
        };
        const response = yield (0, payment_utils_1.makePayment)(paymentInfo);
        return response.data.payment_url;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error === null || error === void 0 ? void 0 : error.message);
    }
});
const getMyOrderFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let userInfo;
    switch (payload.user.role) {
        case client_1.UserRole.CUSTOMER:
            userInfo = yield global_1.prisma.customer.findUniqueOrThrow({
                where: {
                    email: payload.user.email
                }
            });
            break;
        case client_1.UserRole.ADMIN:
            userInfo = yield global_1.prisma.admin.findUniqueOrThrow({
                where: {
                    email: payload.user.email
                }
            });
            break;
        default:
            break;
    }
    const myOrders = yield global_1.prisma.order.findMany({
        where: {
            customerId: userInfo.id,
        },
    });
    if (myOrders.length > 0) {
        const orderIds = myOrders.map((order) => order.id);
        const orderedProducts = yield global_1.prisma.orderProduct.findMany({
            where: {
                orderId: {
                    in: orderIds,
                },
            },
            include: {
                product: true,
            },
        });
        const paymentData = yield global_1.prisma.payment.findMany({
            where: {
                orderId: {
                    in: orderIds,
                },
            },
        });
        const ordersWithDetails = myOrders.map((order) => {
            const products = orderedProducts.filter((op) => op.orderId === order.id);
            const payment = paymentData.find((payment) => payment.orderId === order.id);
            return Object.assign(Object.assign({}, order), { products: products.map((p) => ({
                    id: p.product.id,
                    name: p.product.name,
                    price: p.product.price,
                    quantity: p.quantity,
                })), payment: payment || null });
        });
        return ordersWithDetails;
    }
    else {
        return [];
    }
});
const getOrderFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield global_1.prisma.order.findUnique({
        where: { id: parseInt(_id) }
    });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the order");
    }
    return order;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield global_1.prisma.order.findMany({});
    return orders;
});
const updateOrderIntoDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedOrder = yield global_1.prisma.order.update({
        where: {
            id: parseInt(_id)
        },
        data: payload
    });
    return updatedOrder;
});
exports.OrderServices = {
    createOrderIntoDB,
    getMyOrderFromDB,
    getOrderFromDB,
    updateOrderIntoDB,
    getAllOrdersFromDB
};
