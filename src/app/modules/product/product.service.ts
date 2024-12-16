import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IPaginationOptions, prisma, TProductFilterableFields } from "../../types/global";
import { Prisma, Product } from "@prisma/client";
import { productSearchAbleFields } from "./product.constant";
import { paginationHelper } from "../../utils/paginationHelpers";



const getProductsFromDB = async (params: TProductFilterableFields, options: IPaginationOptions) => {
  const { searchTerm, priceRange, ...filterData } = params;
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const andCondions: Prisma.ProductWhereInput[] = [];
  if (searchTerm) {
    andCondions.push({
      OR: productSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  };

  if (priceRange) {
    andCondions.push({
      OR: [{
        price: {
          lte: parseInt(priceRange),
        }
      }]
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: parseInt((filterData as any)[key])
        }
      }))
    })
  };
  andCondions.push({
    isDeleted: falsegit ad
  })
  const whereConditons: Prisma.ProductWhereInput = { AND: andCondions }

  const result = await prisma.product.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder
    } : {
      createdAt: 'desc'
    },
    include: {
      category: true
    }

  });


  const total = await prisma.product.count({
    where: whereConditons
  });

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };

};








const createProductIntoDB = async (payload: Product) => {
  const newProduct = await prisma.product.create({
    data: payload
  });
  if (!newProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Product");
  }
  return newProduct;
};



const getSingleProductFromDB = async (_id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(_id) },
    include: {
      vendor: true
    }
  })
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
