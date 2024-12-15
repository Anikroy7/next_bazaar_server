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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const global_1 = require("../../types/global");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, adminData = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const userData = {
        email: adminData.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN
    };
    const result = yield global_1.prisma.$transaction((transictionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transictionClient.user.create({
            data: userData
        });
        const createdAdminData = yield transictionClient.admin.create({
            data: adminData
        });
        return createdAdminData;
    }));
    return result;
});
const createVendorIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, vendorData = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const userData = {
        email: vendorData.email,
        password: hashedPassword,
        role: client_1.UserRole.VENDOR
    };
    const result = yield global_1.prisma.$transaction((transictionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transictionClient.user.create({
            data: userData
        });
        const createdVendorData = yield transictionClient.vendor.create({
            data: vendorData
        });
        return createdVendorData;
    }));
    return result;
});
const createCustomerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, customerData = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const userData = {
        email: customerData.email,
        password: hashedPassword,
        role: client_1.UserRole.CUSTOMER
    };
    const result = yield global_1.prisma.$transaction((transictionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transictionClient.user.create({
            data: userData
        });
        const createdCustomerData = yield transictionClient.customer.create({
            data: customerData
        });
        return createdCustomerData;
    }));
    return result;
});
const getMyInfoFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const role = payload.user.role;
    switch (role) {
        case client_1.UserRole.ADMIN:
            return yield global_1.prisma.admin.findUniqueOrThrow({ where: { email: payload.user.email } });
        case client_1.UserRole.CUSTOMER:
            return yield global_1.prisma.customer.findUniqueOrThrow({ where: { email: payload.user.email } });
        case client_1.UserRole.VENDOR:
            return yield global_1.prisma.vendor.findUniqueOrThrow({ where: { email: payload.user.email } });
        default:
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
});
const getAllCustomerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.user.findMany({
        where: {
            role: client_1.UserRole.CUSTOMER
        },
        include: {
            customer: true
        }
    });
    return result;
});
const getAllVendorFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.user.findMany({
        where: {
            role: client_1.UserRole.VENDOR
        },
        include: {
            vendor: true
        }
    });
    return result;
});
const updateAdminIntoDB = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userInfo.user;
    const result = yield global_1.prisma.admin.update({
        where: { email: user.email },
        data: payload
    });
    return result;
});
const updateVendorIntoDB = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userInfo.user;
    const result = yield global_1.prisma.vendor.update({
        where: { email: user.email },
        data: payload
    });
    return result;
});
const updateVendorByIdIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.vendor.update({
        where: { id: parseInt(id) },
        data: payload
    });
    return result;
});
const updateCustomerIntoDB = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userInfo.user;
    const result = yield global_1.prisma.user.update({
        where: { email: user.email },
        data: payload
    });
    return result;
});
const updateCustomerByIdIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.customer.update({
        where: { id: parseInt(id) },
        data: payload,
        include: {
            user: true
        }
    });
    return result;
});
const updateStatusIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            status: data.status
        }
    });
    return result;
});
const updateRoleIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield global_1.prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            role: data.role
        }
    });
    return result;
});
const vendorBlacklistIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.isBlacklisted) {
        yield global_1.prisma.$transaction((prismaClient) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const user = yield prismaClient.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    status: client_1.UserStatus.BLOCKED
                },
                include: {
                    vendor: true
                }
            });
            yield prismaClient.vendor.update({
                where: {
                    id: (_a = user.vendor) === null || _a === void 0 ? void 0 : _a.id
                },
                data: {
                    isBlacklisted: true
                }
            });
        }));
    }
    else {
        yield global_1.prisma.$transaction((prismaClient) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const user = yield prismaClient.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    status: client_1.UserStatus.ACTIVE
                },
                include: {
                    vendor: true
                }
            });
            yield prismaClient.vendor.update({
                where: {
                    id: (_a = user.vendor) === null || _a === void 0 ? void 0 : _a.id
                },
                data: {
                    isBlacklisted: false
                }
            });
        }));
    }
});
const getSingleVendorFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vendorInfo = yield global_1.prisma.vendor.findUniqueOrThrow({
        where: {
            id: parseInt(id)
        }
    });
    const vendorProducts = yield global_1.prisma.product.findMany({
        where: {
            vendorId: vendorInfo.id
        },
        include: {
            vendor: true
        }
    });
    const vendorWithProduct = Object.assign(Object.assign({}, vendorInfo), { products: vendorProducts });
    return vendorWithProduct;
});
exports.UserServices = {
    createAdminIntoDB,
    createVendorIntoDB,
    createCustomerIntoDB,
    getMyInfoFromDB,
    updateAdminIntoDB,
    updateVendorIntoDB,
    updateCustomerIntoDB,
    updateVendorByIdIntoDB,
    updateCustomerByIdIntoDB,
    getAllCustomerFromDB,
    getAllVendorFromDB,
    updateStatusIntoDB,
    updateRoleIntoDB,
    vendorBlacklistIntoDB,
    getSingleVendorFromDB
};
