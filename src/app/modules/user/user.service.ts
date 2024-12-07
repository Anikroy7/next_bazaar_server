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

export const UserService = {
    createAdminIntoDB
}