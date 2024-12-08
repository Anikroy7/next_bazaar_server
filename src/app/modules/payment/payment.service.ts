const caretePaymentIntoDB = async (payload: any) => {

    // const _id = req.query.orderId;
    // const userId = req.query.userId;
    // const tran_id = req.query.tran_id;
    // await Order.findByIdAndUpdate(_id, { paymentStatus: "Paid" });
    // await User.findByIdAndUpdate(userId, { transactionId: tran_id, isVerified: true, order: _id });
    console.log(payload)

}

export const PaymentServices = {
    caretePaymentIntoDB
}