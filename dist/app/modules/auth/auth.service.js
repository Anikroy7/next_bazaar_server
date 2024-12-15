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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const global_1 = require("../../types/global");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if the user is exist
    const user = yield global_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    console.log('froim client', user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid crediantial!");
    }
    //if the password is correct
    const isValid = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isValid)
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid crediantial!");
    //create token and sent to the client
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const forgetPasswod = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //if the user is exist
    const user = yield global_1.prisma.user.findUniqueOrThrow({
        where: { email: payload.email }
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found with this email!");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const resetURl = `${config_1.default.send_email_ui_link}/reset-password/?email=${user.email}&token=${accessToken}`;
    yield (0, sendEmail_1.sendEmail)(payload.email, resetURl);
    return { resetURl };
});
const resetPasswod = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the token is missing
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route!");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { email } = decoded;
    if (email !== payload.email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Something invalid happen");
    }
    // //if the user is exist
    const user = yield global_1.prisma.user.findUniqueOrThrow({ where: { email: payload.email } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid crediantial!");
    }
    const newPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const updateUser = yield global_1.prisma.user.update({
        where: { email: payload.email },
        data: {
            password: newPassword
        }
    });
    return updateUser;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield global_1.prisma.user.findUniqueOrThrow({
        where: { email: email }
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found with this email!");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    forgetPasswod,
    resetPasswod,
    refreshToken
};
