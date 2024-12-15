import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { prisma } from "../../types/global"
import { VendorReview, Review } from "@prisma/client"

const createVendorReviewIntoDB = async (payload: Review & VendorReview) => {
    const { vendorId, ...reviewData } = payload
    const result = await prisma.$transaction(async (transactionClient) => {
        const reviewInfo = await transactionClient.review.create({ data: reviewData })
        await transactionClient.vendorReview.create({
            data: {
                vendorId: vendorId,
                reviewId: reviewInfo.id
            }
        })
        return reviewInfo
    })
    return result
}

const getAllVendorReviewsFromDB = async () => {
    const result = await prisma.vendorReview.findMany({
        include: {
            review: true
        }
    });
    return result
}

const getSingleVendorReviewsFromDB = async ( vendorId: string) => {
    const pr = await prisma.vendorReview.findMany({
        where: {
            vendorId: parseInt(vendorId)
        },
        include: {
            review: true
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the vendor reivew!");
    }
    return pr;
}

const updateVendorReviewIntoDB = async (reviewId: string, payload: Review) => {
    const result = await prisma.review.update({
        where: {
            id: parseInt(reviewId),
        },
        data: payload
    });

    return result;
};

const deleteVendorReviewFromDB = async (reviewId: string) => {
    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.review.delete({
            where: {
                id: parseInt(reviewId)
            }
        })
        await transactionClient.productReview.deleteMany({
            where: {
                reviewId: parseInt(reviewId)
            }
        })
    })
    return result
};

export const VendorReviewSerives = {
    getAllVendorReviewsFromDB,
    createVendorReviewIntoDB,
    getSingleVendorReviewsFromDB,
    updateVendorReviewIntoDB,
    deleteVendorReviewFromDB

}