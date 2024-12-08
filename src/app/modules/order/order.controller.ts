import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrderServices } from "./order.service";



const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;
  // console.log('car data', orde rData)
  const result = await OrderServices.createOrderIntoDB(orderData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
const getMyOrder = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const result = await OrderServices.getMyOrderFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrived successfully",
    data: result,
  });
});
const getMySingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getMyOrderFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrived successfully",
    data: result,
  });
});




const getOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const result = await OrderServices.getOrderFromDB(orderId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order retrieved successfully",
    data: result,
  });
});


const getAllOrders = catchAsync(async (req, res) => {

  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await OrderServices.updateOrderIntoDB(orderId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order updated successfully",
    data: result,
  });
});
export const OrderControllers = {
  createOrder,
  getMyOrder,
  getOrder,
  getMySingleOrder,
  getAllOrders,
  updateOrder
};