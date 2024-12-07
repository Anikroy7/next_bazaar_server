import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserService.createAdminIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,

};
