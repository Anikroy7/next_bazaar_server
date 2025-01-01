import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
;


const createLetterIntoDB = async (payload: { email: string }) => {
    const exists = await prisma.newsLetter.findUnique({
        where: {
            email: payload.email 
        }
    })
    if (exists) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");

    }
    const newLetter = await prisma.newsLetter.create({ data: payload });
    if (!newLetter) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create news letter");
    }
    return newLetter;
};
const getAllLettersFromDB = async () => {
    const letter = await prisma.newsLetter.findMany({});
    return letter;
};
const deleteLetterFromDB = async (_id: string) => {
    const category = await prisma.newsLetter.findUnique({ where: { id: parseInt(_id) } });
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the letter");
    }
    const deletedLetter = await prisma.newsLetter.delete({
        where: {
            id: parseInt(_id)
        }
    })
    return deletedLetter;
};
export const NewsLetterServices = {
    createLetterIntoDB,
    getAllLettersFromDB,
    deleteLetterFromDB
};
