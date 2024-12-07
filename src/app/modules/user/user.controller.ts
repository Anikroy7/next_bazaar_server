import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createAdminIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
const createVendor = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createVendorIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor created successfully",
    data: result,
  });
});
const createCustomer = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createCustomerIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const getMyInfo = catchAsync(async (req, res) => {
  const result = await UserServices.getMyInfoFromDB(req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.updateAdminIntoDB(req, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const updateVendor = catchAsync(async (req, res) => {
  const result = await UserServices.updateVendorIntoDB(req, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor updated successfully",
    data: result,
  });
});
const updateCustomer = catchAsync(async (req, res) => {
  const result = await UserServices.updateCustomerIntoDB(req, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});




export const UserControllers = {
  createAdmin,
  createVendor,
  createCustomer,
  getMyInfo,
  updateAdmin,
  updateVendor,
  updateCustomer
};
