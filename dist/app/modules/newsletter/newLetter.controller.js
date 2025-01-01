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
exports.NewsLetterControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const newLetter_service_1 = require("./newLetter.service");
const sendNewsLetter_1 = require("../../utils/sendNewsLetter");
const createLetter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const letterData = req.body;
    const result = yield newLetter_service_1.NewsLetterServices.createLetterIntoDB(letterData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Thanks for your subscribtion",
        data: result,
    });
}));
const getAllLetters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield newLetter_service_1.NewsLetterServices.getAllLettersFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "News letters retrieved successfully",
        data: result,
    });
}));
const deleteLetter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { letterId } = req.params;
    const result = yield newLetter_service_1.NewsLetterServices.deleteLetterFromDB(letterId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "News letter deleted successfully",
        data: result,
    });
}));
const sendEmailToSubscriber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { message } = req.body;
    yield (0, sendNewsLetter_1.sendNewsLetterEmail)(email, message);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "News letter send successfully"
    });
}));
exports.NewsLetterControllers = {
    createLetter,
    getAllLetters,
    deleteLetter,
    sendEmailToSubscriber
};
