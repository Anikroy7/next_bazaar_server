import { PaymentStatus } from "@prisma/client"
import { prisma } from "../../types/global"


const getPaymentsFromDB = async () => {
    const result = await prisma.payment.findMany({
        include: {
            order: true
        }
    });
    return result
}

const createPaymentIntoDB = async (payload: any) => {
    await prisma.payment.create({
        data: {
            orderId: parseInt(payload.orderId),
            paymentStatus: PaymentStatus.SUCCESS,
            transactionId: payload.tran_id,
        }
    })
}
const cancelOrderIntoDB = async (orderId: string) => {
    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.orderProduct.deleteMany({
            where: {
                orderId: parseInt(orderId)
            }
        })
        await transactionClient.payment.delete({
            where: {
                orderId: parseInt(orderId)
            }
        })
        await transactionClient.order.delete({
            where: { id: parseInt(orderId) }
        })
    })
    return result
}


export const PaymentServices = {
    createPaymentIntoDB,
    cancelOrderIntoDB,
    getPaymentsFromDB
}