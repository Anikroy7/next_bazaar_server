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
const updateVendorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateVendorByIdIntoDB(id, req.body);
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
const updateCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.updateCustomerIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});
const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.updateStatusIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status updated successfully",
    data: result,
  });
});
const updateRole = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.updateRoleIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "role updated successfully",
    data: result,
  });
});

const getAllCustomerInfo = catchAsync(async (req, res) => {
  const result = await UserServices.getAllCustomerFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Customers retrieved successfully",
    data: result,
  });
});
const getAllVendorInfo = catchAsync(async (req, res) => {
  const result = await UserServices.getAllVendorFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Vendoros retrieved successfully",
    data: result,
  });
});
const getSingleVendor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.getSingleVendorFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Vendoros retrieved successfully",
    data: result,
  });
});

const vendorBlackList = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.vendorBlacklistIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vendor blacklisted successfully",
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
  updateCustomer,
  updateVendorById,
  updateCustomerById,
  getAllCustomerInfo,
  getAllVendorInfo,
  updateStatus,
  updateRole,
  vendorBlackList,
  getSingleVendor
};
