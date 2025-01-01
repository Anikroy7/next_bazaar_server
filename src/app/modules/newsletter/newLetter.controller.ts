import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { prisma } from "../../types/global";
import { NewsLetterServices } from "./newLetter.service";
import { sendNewsLetterEmail } from "../../utils/sendNewsLetter";

const createLetter = catchAsync(async (req, res) => {
    const letterData = req.body;
    const result = await NewsLetterServices.createLetterIntoDB(letterData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Thanks for your subscribtion",
        data: result,
    });
});
const getAllLetters = catchAsync(async (req, res) => {

    const result = await NewsLetterServices.getAllLettersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "News letters retrieved successfully",
        data: result,
    });
});

const deleteLetter = catchAsync(async (req, res) => {
    const { letterId } = req.params;
    const result = await NewsLetterServices.deleteLetterFromDB(letterId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "News letter deleted successfully",
        data: result,
    });
});


const sendEmailToSubscriber = catchAsync(async (req, res) => {
    const { email } = req.params;
    const { message } = req.body
    await sendNewsLetterEmail(email, message)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "News letter send successfully"
    });
});


export const NewsLetterControllers = {
    createLetter,
    getAllLetters,
    deleteLetter,
    sendEmailToSubscriber
};
