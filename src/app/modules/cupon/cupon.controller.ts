import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CuponServices } from "./cupon.service";
import catchAsync from "../../utils/catchAsync";

const createCupon = catchAsync(async (req, res) => {
    const cuponData = req.body;
    const result = await CuponServices.createCuponIntoDB(cuponData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cupon created successfully",
        data: result,
    });
});
const getAllCupons = catchAsync(async (req, res) => {
    const result = await CuponServices.getAllCuponsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cupons retrived successfully",
        data: result,
    });
});
const updateCupon = catchAsync(async (req, res) => {
    const { cuponId } = req.params;
    const result = await CuponServices.updateCuponIntoDB(cuponId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cupons update successfully",
        data: result,
    });
});
const deleteCupon = catchAsync(async (req, res) => {
    const { cuponId } = req.params;

    const result = await CuponServices.deleteCuponIntoDB(cuponId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cupons retrived successfully",
        data: result,
    });
});


export const CuponControllers = {
    createCupon,
    getAllCupons,
    updateCupon,
    deleteCupon
};