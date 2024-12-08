import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { prisma } from "../../types/global"
import { ProductReview, Review } from "@prisma/client"

const createProductReviewIntoDB = async (payload: Review & ProductReview) => {
    const { productId, ...reviewData } = payload
    const result = await prisma.$transaction(async (transactionClient) => {
        const reviewInfo = await transactionClient.review.create({ data: reviewData })
        await transactionClient.productReview.create({
            data: {
                productId: productId,
                reviewId: reviewInfo.id
            }
        })
        return reviewInfo
    })
    return result
}

const getAllProductReviewsFromDB = async () => {
    const result = await prisma.productReview.findMany({
        include: {
            review: true
        }
    });
    return result
}
const getSingleProductReviewsFromDB = async (reviewId: string, productId: string) => {
    const pr = await prisma.productReview.findUnique({
        where: {
            reviewId_productId: {
                reviewId: parseInt(reviewId),
                productId: parseInt(productId)
            }
        },
        include: {
            review: true
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the product reivew!");
    }
    return pr;
}

const updateProductReviewIntoDB = async (reviewId: string, productId: string, payload: Review) => {
    const pr = await prisma.productReview.findUnique({
        where: {
            reviewId_productId: {
                reviewId: parseInt(reviewId),
                productId: parseInt(productId)
            }
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the product reivew!");
    }
    const result = await prisma.review.update({
        where: {
            id: pr.reviewId
        },
        data: payload
    });
    return result;
};

const deleteProductReviewFromDB = async (reviewId: string, productId: string,) => {
    const pr = await prisma.productReview.findUnique({
        where: {
            reviewId_productId: {
                reviewId: parseInt(reviewId),
                productId: parseInt(productId)
            }
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the product reivew!");
    }
    const updatedpr = await prisma.review.update({
        where: {
            id: pr.reviewId
        },
        data: {
            isDeleted: true
        }
    });
    return updatedpr;
};

export const ProductReviewSerives = {
    getAllProductReviewsFromDB,
    createProductReviewIntoDB,
    getSingleProductReviewsFromDB,
    updateProductReviewIntoDB,
    deleteProductReviewFromDB

}