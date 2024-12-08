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
const getSingleVendorReviewsFromDB = async (reviewId: string, vendorId: string) => {
    const pr = await prisma.vendorReview.findUnique({
        where: {
            reviewId_vendorId: {
                reviewId: parseInt(reviewId),
                vendorId: parseInt(vendorId)
            }
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

const updateVendorReviewIntoDB = async (reviewId: string, vendorId: string, payload: Review) => {
    const pr = await prisma.vendorReview.findUnique({
        where: {
            reviewId_vendorId: {
                reviewId: parseInt(reviewId),
                vendorId: parseInt(vendorId)
            }
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the vendor reivew!");
    }
    const result = await prisma.review.update({
        where: { id: pr.reviewId },
        data: payload
    });
    return result;
};

const deleteVendorReviewFromDB = async (reviewId: string, vendorId: string) => {
    const pr = await prisma.vendorReview.findUnique({
        where: {
            reviewId_vendorId: {
                reviewId: parseInt(reviewId),
                vendorId: parseInt(vendorId)
            }
        }
    });
    if (!pr) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the vendor reivew!");
    }
    const updatedpr = await prisma.review.update({
        where: { id: pr.reviewId },
        data: {
            isDeleted: true
        }
    });
    return updatedpr;
};

export const VendorReviewSerives = {
    getAllVendorReviewsFromDB,
    createVendorReviewIntoDB,
    getSingleVendorReviewsFromDB,
    updateVendorReviewIntoDB,
    deleteVendorReviewFromDB

}