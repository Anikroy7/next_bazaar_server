import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";
import { prisma } from "../../types/global";
import pick from "../../utils/pick";
import { productFilterableFields } from "./product.constant";


const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await ProductServices.getProductsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  const result = await ProductServices.updateProductIntoDB(id, productData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products deleted successfully",
  });
});

//! temp
const insertMany = catchAsync(async (req, res) => {
  console.log('may', req.body)
  const newProduct = await prisma.product.createMany({
    data: req.body, // The array of products to insert
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products many successfully",
    data: newProduct,
  });
});


//! temp



export const ProductControllers = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  insertMany

};
