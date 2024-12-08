import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import config from "../../config";

const createPayment = catchAsync(async (req, res) => {
  const _id = req.query.orderId;
  const userId = req.query.userId;
  const tran_id = req.query.tran_id;
  
  await PaymentServices.caretePaymentIntoDB({ _id, userId, tran_id })
  res.send(`
      
        <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
      </head>
        <style>
          body {
            text-align: center;
            padding: 40px 0;
            background: #EBF0F5;
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
            <a href='${config.client_base_url}/payment/successfull' className="btn btn-success btn-sm text-white" >Back to home</a>
          </div>
        </body>
    </html>
        
        `)
});

export const PaymentController = {
  createPayment
}