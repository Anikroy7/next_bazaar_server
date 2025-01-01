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
exports.NewsLetterServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const global_1 = require("../../types/global");
;
const createLetterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield global_1.prisma.newsLetter.findUnique({
        where: {
            email: payload.email
        }
    });
    if (exists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid crediantial!");
    }
    const newLetter = yield global_1.prisma.newsLetter.create({ data: payload });
    if (!newLetter) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create news letter");
    }
    return newLetter;
});
const getAllLettersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const letter = yield global_1.prisma.newsLetter.findMany({});
    return letter;
});
const deleteLetterFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield global_1.prisma.newsLetter.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Can't find the letter");
    }
    const deletedLetter = yield global_1.prisma.newsLetter.delete({
        where: {
            id: parseInt(_id)
        }
    });
    return deletedLetter;
});
exports.NewsLetterServices = {
    createLetterIntoDB,
    getAllLettersFromDB,
    deleteLetterFromDB
};
