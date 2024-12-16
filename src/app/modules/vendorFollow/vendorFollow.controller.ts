import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { VendorFollowServices } from "./vendorFollow.service";

const addVendorFollower = catchAsync(async (req, res) => {
    const vendorFollowData = req.body;

    const result = await VendorFollowServices.addFollowersIntoDB(vendorFollowData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor follower added successfully",
        data: result,
    });
});
const isFollowed = catchAsync(async (req, res) => {
    const vendorFollowData = req.body;

    const result = await VendorFollowServices.isFollowedFromDB(vendorFollowData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Is followed data",
        data: result,
    });
});
const removeVendorFollower = catchAsync(async (req, res) => {
    const vendorFollowData = req.body;
    const result = await VendorFollowServices.removeFollowersIntoDB(vendorFollowData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor follower remove successfully",
        data: result,
    });
});

export const VendorFollowController = {
    addVendorFollower,
    removeVendorFollower,
    isFollowed
};
