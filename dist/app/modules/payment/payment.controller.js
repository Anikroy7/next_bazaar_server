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
exports.PaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_service_1 = require("./payment.service");
const config_1 = __importDefault(require("../../config"));
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.query.orderId;
    const userId = req.query.userId;
    const tran_id = req.query.tran_id;
    yield payment_service_1.PaymentServices.caretePaymentIntoDB({ orderId, userId, tran_id });
    res.send(`
      
        <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
      </head>
        <style>
          body {
            text-align: center;
            padding: 40px 0;
          }
            h1 {
              color: #88B04B;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-weight: 900;
              font-size: 40px;
              margin-bottom: 10px;
            }
            p {
              color: #404F5E;
              font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
              font-size:20px;
              margin: 0;
            }
          i {
            color: #9ABC66;
            font-size: 100px;
            line-height: 200px;
            margin-left:-15px;
          }
          .card {
            background: white;
            padding: 60px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #C8D0D8;
            display: inline-block;
            margin: 0 auto;
          }
        </style>
        <body>
          <div class="card">
          <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
            <i class="checkmark">✓</i>
          </div>
            <h1>Success</h1> 
            <p>Payment received successfully!</p>
            <a href='${config_1.default.client_base_url}/order-history' className="btn btn-success btn-sm text-white" >Back to home</a>
          </div>
        </body>
    </html>
        
        `);
}));
const cancelPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.query.orderId;
    yield payment_service_1.PaymentServices.cancelOrderIntoDB(orderId);
    res.send(`
      
       <html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
  </head>
  <style>
    body {
      text-align: center;
      padding: 40px 0;
      background: #F8E6E6;
    }
    h1 {
      color: #D9534F;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
      font-weight: 900;
      font-size: 40px;
      margin-bottom: 10px;
    }
    p {
      color: #404F5E;
      font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
      font-size: 20px;
      margin: 0;
    }
    i {
      color: #D9534F;
      font-size: 100px;
      line-height: 200px;
      margin-left: -15px;
    }
    .card {
      background: white;
      padding: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 3px #C8D0D8;
      display: inline-block;
      margin: 0 auto;
    }
  </style>
  <body>
    <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #FDECEC; margin:0 auto;">
        <i class="checkmark">✘</i>
      </div>
      <h1>Cancelled</h1>
      <p>Your payment has been cancelled.<br />Please try again or contact support.</p>
      <a href='${config_1.default.client_base_url}/order-history' className="btn btn-danger btn-sm text-white">Back to home</a>
    </div>
  </body>
</html>

        
        `);
}));
exports.PaymentController = {
    createPayment,
    cancelPayment
};
