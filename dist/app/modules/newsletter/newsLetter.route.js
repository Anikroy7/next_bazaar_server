"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const newLetter_controller_1 = require("./newLetter.controller");
const router = express_1.default.Router();
router.get('/', newLetter_controller_1.NewsLetterControllers.getAllLetters);
router.post('/', newLetter_controller_1.NewsLetterControllers.createLetter);
router.post('/sendEmail/:email', (0, auth_1.default)(client_1.UserRole.ADMIN), newLetter_controller_1.NewsLetterControllers.sendEmailToSubscriber);
router.delete('/:letterId', (0, auth_1.default)(client_1.UserRole.ADMIN), newLetter_controller_1.NewsLetterControllers.deleteLetter);
exports.LetterRoutes = router;
