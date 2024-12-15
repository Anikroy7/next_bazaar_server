"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const makePayment = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post('https://​sandbox​.aamarpay.com/jsonpost.php', {
        "store_id": `${config_1.default.storeId}`,
        "tran_id": paymentInfo.transactionId,
        "success_url": `${config_1.default.server_base_url}/api/payment/confirm?tran_id=${paymentInfo.transactionId}&orderId=${paymentInfo.orderId}&userId=${paymentInfo.user._id}`,
        "fail_url": `${config_1.default.server_base_url}/api/payment/cancel?orderId=${paymentInfo.orderId}`,
        "cancel_url": "http://www.merchantdomain.com/can cellpage.html",
        "amount": paymentInfo.totalPrice,
        "currency": "BDT",
        "signature_key": `${config_1.default.signatureKey}`,
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
    });
    return response;
});
exports.makePayment = makePayment;
