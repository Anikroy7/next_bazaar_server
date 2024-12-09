import axios from "axios"
import config from "../../config"

type TPaymentInfo = {
    transactionId: string;
    totalPrice: number;
    user: {
        _id: Number
        name: string;
        email: string;
        address: string;
        phone: string;
    },
    orderId: Number,
}


export const makePayment = async (paymentInfo: TPaymentInfo) => {
    const response = await axios.post('https://​sandbox​.aamarpay.com/jsonpost.php', {
        "store_id": `${config.storeId}`,
        "tran_id": paymentInfo.transactionId,
        "success_url": `${config.server_base_url}/api/payment/confirm?tran_id=${paymentInfo.transactionId}&orderId=${paymentInfo.orderId}&userId=${paymentInfo.user._id}`,
        "fail_url": `${config.server_base_url}/api/payment/cancel?orderId=${paymentInfo.orderId}`,
        "cancel_url": "http://www.merchantdomain.com/can cellpage.html",
        "amount": paymentInfo.totalPrice,
        "currency": "BDT",
        "signature_key": `${config.signatureKey}`,
        "desc": "Product order payment",
        "cus_name": paymentInfo.user.name,
        "cus_email": paymentInfo.user.email,
        "cus_add1": paymentInfo.user.address,
        "cus_add2": "Mohakhali DOHS",
        "cus_city": "Dhaka",
        "cus_state": "Dhaka",
        "cus_postcode": "1206",
        "cus_country": "Bangladesh",
        "cus_phone": paymentInfo.user.phone,
        "type": "json"
    })
    return response
}