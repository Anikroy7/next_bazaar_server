import { VendorFollow } from "@prisma/client";
import { prisma } from "../../types/global";

const addFollowersIntoDB = async (payload: VendorFollow) => {
    const result = await prisma.vendorFollow.create({
        data: payload
    })
    return result;
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
    removeFollowersIntoDB
}