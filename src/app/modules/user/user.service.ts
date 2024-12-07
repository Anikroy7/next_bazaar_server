import { UserRole } from "@prisma/client"
import bcyrpt from 'bcrypt'
import { prisma } from "../../types/global";


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

export const UserServices = {
    createAdminIntoDB,
    createVendorIntoDB,
    createCustomerIntoDB
}