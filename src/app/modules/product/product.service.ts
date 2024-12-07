import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";
import { Product } from "@prisma/client";

const createProductIntoDB = async (payload: Product) => {
  console.log(payload)
  const newProduct = await prisma.product.create({
    data: payload
  });
  if (!newProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Product");
  }
  return newProduct;
};

const getProductsFromDB = async () => {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false
    }
  });
  if (products.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "There are not products here");
  }
  return products;
  ;
};

const getSingleProductFromDB = async (_id: string) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(_id) } })
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This car is already deleted");
  }
  return product;
};

const updateProductIntoDB = async (_id: string, payload: Product) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(_id) } });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This product is already deleted!!!"
    );
  }
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(_id) },
    data: payload
  })
  return updatedProduct;
};

const deleteProductFromDB = async (_id: string) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(_id) } });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the product");
  }
  if (product?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This product is already deleted!!"
    );
  }
  await prisma.product.update({
    where: { id: parseInt(_id) },
    data: { isDeleted: true }
  });
};


export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getSingleProductFromDB,
};
