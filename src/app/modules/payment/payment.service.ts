import { PaymentStatus } from "@prisma/client"
import { prisma } from "../../types/global"

const caretePaymentIntoDB = async (payload: any) => {
    await prisma.payment.create({
        data: {
            orderId: parseInt(payload.orderId),
            paymentStatus: PaymentStatus.SUCCESS,
            transactionId: payload.tran_id,
        }
    })
}
const cancelOrderIntoDB = async (orderId: string) => {
    await prisma.orderProduct.deleteMany({
        where: {
            orderId: parseInt(orderId)
        }
    })
    await prisma.order.delete({
        where: { id: parseInt(orderId) }
    })
}

export const PaymentServices = {
    caretePaymentIntoDB,
    cancelOrderIntoDB
}