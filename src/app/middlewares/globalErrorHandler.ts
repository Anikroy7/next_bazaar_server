import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode: string | number = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err instanceof Prisma.PrismaClientValidationError) {
        message = 'Validation Error';
        error = err.message
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
           
            message = "User already exits with this email!!";
            error = err.meta;
        } 
        if (err.code === 'P2002') {
        } else if (err.code === "P2025") {
            message = "Data not found!";
            error = err.meta;
        }
    } 


    res.status(statusCode).json({
        success,
        message,
        error,
        errorSources
    })
};

export default globalErrorHandler;