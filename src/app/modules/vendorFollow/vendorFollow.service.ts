import { VendorFollow } from "@prisma/client";
import { prisma } from "../../types/global";

const addFollowersIntoDB = async (payload: { vendorId: number; customerId: number }) => {
    const result = await prisma.vendorFollow.create({
        data: {
            vendorId: payload.vendorId,
            customerId: payload.customerId,
        },
    });
    return result;
};

const isFollowedFromDB = async (payload: { vendorId: number; customerId: number }) => {
    const result = await prisma.vendorFollow.findUnique({
        where: {
            vendorId_customerId: {
                customerId: payload.customerId,
                vendorId: payload.vendorId
            }
        }
    });

    return result
}

const removeFollowersIntoDB = async (payload: VendorFollow) => {
    const result = await prisma.vendorFollow.delete({
        where: {
            vendorId_customerId: {
                vendorId: payload.vendorId,
                customerId: payload.customerId
            }
        }
    })
    return result;
}

export const VendorFollowServices = {
    addFollowersIntoDB,
    removeFollowersIntoDB,
    isFollowedFromDB
}