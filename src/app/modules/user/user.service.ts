import { UserRole, UserStatus } from "@prisma/client"
import bcyrpt from 'bcrypt'
import { prisma } from "../../types/global";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createAdminIntoDB = async (payload: any) => {
    const { password, ...adminData } = payload;
    const hashedPassword: string = await bcyrpt.hash(payload.password, 10);
    const userData = {
        email: adminData.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (transictionClient) => {
        await transictionClient.user.create({
            data: userData
        })

        const createdAdminData = await transictionClient.admin.create({
            data: adminData
        })
        return createdAdminData
    })

    return result
}

const createVendorIntoDB = async (payload: any) => {
    const { password, ...vendorData } = payload;
    const hashedPassword: string = await bcyrpt.hash(payload.password, 10);
    const userData = {
        email: vendorData.email,
        password: hashedPassword,
        role: UserRole.VENDOR
    }
    const result = await prisma.$transaction(async (transictionClient) => {
        await transictionClient.user.create({
            data: userData
        })

        const createdVendorData = await transictionClient.vendor.create({
            data: vendorData
        })
        return createdVendorData
    })

    return result
}

const createCustomerIntoDB = async (payload: any) => {
    const { password, ...customerData } = payload;
    const hashedPassword: string = await bcyrpt.hash(payload.password, 10);
    const userData = {
        email: customerData.email,
        password: hashedPassword,
        role: UserRole.CUSTOMER
    }
    const result = await prisma.$transaction(async (transictionClient) => {
        await transictionClient.user.create({
            data: userData
        })

        const createdCustomerData = await transictionClient.customer.create({
            data: customerData
        })
        return createdCustomerData
    })

    return result
}

const getMyInfoFromDB = async (payload: any) => {
    const role = payload.user.role;
    switch (role) {
        case UserRole.ADMIN:
            return await prisma.admin.findUniqueOrThrow({ where: { email: payload.user.email } })
        case UserRole.CUSTOMER:
            return await prisma.customer.findUniqueOrThrow({ where: { email: payload.user.email } })
        case UserRole.VENDOR:
            return await prisma.vendor.findUniqueOrThrow({ where: { email: payload.user.email } })
        default:
            throw new AppError(httpStatus.BAD_REQUEST, 'User not found');
    }
}
const getAllCustomerFromDB = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: UserRole.CUSTOMER
        },
        include: {
            customer: true
        }
    })
    return result;
}
const getAllVendorFromDB = async () => {
    const result = await prisma.user.findMany(
        {
            where: {
                role: UserRole.VENDOR
            },
            include: {
                vendor: true
            }
        }
    )
    return result;
}

const updateAdminIntoDB = async (userInfo: any, payload: any) => {
    const user = userInfo.user;
    const result = await prisma.admin.update(
        {
            where: { email: user.email },
            data: payload
        }
    )
    return result
}
const updateVendorIntoDB = async (userInfo: any, payload: any) => {
    const user = userInfo.user;
    const result = await prisma.vendor.update(
        {
            where: { email: user.email },
            data: payload
        }
    )
    return result
}

const updateVendorByIdIntoDB = async (id: string, payload: any) => {
    const result = await prisma.vendor.update(
        {
            where: { id: parseInt(id) },
            data: payload
        }
    )
    return result
}

const updateCustomerIntoDB = async (userInfo: any, payload: any) => {
    const user = userInfo.user;
    const result = await prisma.user.update(
        {
            where: { email: user.email },
            data: payload
        }
    )
    return result
}
const updateCustomerByIdIntoDB = async (id: string, payload: any) => {
    const result = await prisma.customer.update(
        {
            where: { id: parseInt(id) },
            data: payload,
            include: {
                user: true
            }
        }
    )
    return result
}


const updateStatusIntoDB = async (id: string, data: { status: UserStatus }) => {
    const result = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            status: data.status
        }
    })
    return result
}

const updateRoleIntoDB = async (id: string, data: { role: UserRole }) => {
    const result = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            role: data.role
        }
    })
    return result
}
const vendorBlacklistIntoDB = async (id: string, data: { isBlacklisted: boolean }) => {

    console.log('come form client', data)
    if (data.isBlacklisted) {
        await prisma.$transaction(async (prismaClient) => {
            const user = await prismaClient.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    status: UserStatus.BLOCKED
                },
                include: {
                    vendor: true
                }
            })

            await prismaClient.vendor.update({
                where: {
                    id: user.vendor?.id
                },
                data: {
                    isBlacklisted: true
                }
            })
        })

    } else {
        await prisma.$transaction(async (prismaClient) => {
            const user = await prismaClient.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    status: UserStatus.ACTIVE
                },
                include: {
                    vendor: true
                }
            })

            await prismaClient.vendor.update({
                where: {
                    id: user.vendor?.id
                },
                data: {
                    isBlacklisted: false
                }
            })
        })
    }
}
export const UserServices = {
    createAdminIntoDB,
    createVendorIntoDB,
    createCustomerIntoDB,
    getMyInfoFromDB,
    updateAdminIntoDB,
    updateVendorIntoDB,
    updateCustomerIntoDB,
    updateVendorByIdIntoDB,
    updateCustomerByIdIntoDB,
    getAllCustomerFromDB,
    getAllVendorFromDB,
    updateStatusIntoDB,
    updateRoleIntoDB,
    vendorBlacklistIntoDB
}