import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const getPayments = catchAsync(async (req, res) => {

  const result = await PaymentServices.getPaymentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrived successfully",
    data: result,
  });
});
const cancelPaymentByAdmin = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await PaymentServices.cancelOrderIntoDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment cancel successfully",
    data: result,
  });
});

const createPayment = catchAsync(async (req, res) => {
  const orderId = req.query.orderId;
  const userId = req.query.userId;
  const tran_id = req.query.tran_id;

  await PaymentServices.createPaymentIntoDB({ orderId, userId, tran_id })
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
            <a href='${config.client_base_url}/order-history' className="btn btn-success btn-sm text-white" >Back to home</a>
          </div>
        </body>
    </html>
        
        `)
});
const cancelPayment = catchAsync(async (req, res) => {
  const orderId = req.query.orderId as string;


  await PaymentServices.cancelOrderIntoDB(orderId)
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
      <a href='${config.client_base_url}/order-history' className="btn btn-danger btn-sm text-white">Back to home</a>
    </div>
  </body>
</html>

        
        `)
});

export const PaymentController = {
  createPayment,
  cancelPayment,
  getPayments,
  cancelPaymentByAdmin
}