import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { generateTransactionId } from "../../utils/generateRandom";
import { makePayment } from "../payment/payment.utils";
import { Order, UserRole } from "@prisma/client";
import { prisma } from "../../types/global";

const createOrderIntoDB = async (payload: any) => {
  const { orderData, productData } = payload
  const userInfo = await prisma.customer.findUnique({
    where: {
      id: orderData.customerId
    }
  });

  if (!userInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is not exists!!");
  }
  const vendorInfo = await prisma.vendor.findUnique({
    where: {
      id: orderData.vendorId
    }
  });

  if (!vendorInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "This vendor is not exists!!");
  }
  try {
    const transactionId = generateTransactionId();

    const newOrder = await prisma.$transaction(async (transactionClient) => {
      const orderInfo = await transactionClient.order.create({
        data: orderData
      })
      productData.forEach(async (data: any) => {
        await prisma.orderProduct.create({
          data: {
            orderId: orderInfo.id,
            productId: data.id,
            quantity: data.quantity
          }
        })
      });
      return orderInfo
    });
    const paymentInfo = {
      transactionId,
      totalPrice: orderData.totalPrice,
      user: {
        _id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        address: userInfo.address,
        phone: userInfo.phone
      },
      orderId: newOrder.id,
    }
    const response = await makePayment(paymentInfo);
    return response.data.payment_url;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);

  }

};


const getMyOrderFromDB = async (payload: any) => {
  let userInfo: any;

  switch (payload.user.role) {
    case UserRole.CUSTOMER:
      userInfo = await prisma.customer.findUniqueOrThrow({
        where: {
          email: payload.user.email
        }
      })
      break;
    case UserRole.ADMIN:
      userInfo = await prisma.admin.findUniqueOrThrow({
        where: {
          email: payload.user.email
        }
      })
      break;

    default:
      break;
  }

  const myOrders = await prisma.order.findMany({
    where: {
      customerId: userInfo.id,
    },
  });

  if (myOrders.length > 0) {
    const orderIds = myOrders.map((order) => order.id);

    const orderedProducts = await prisma.orderProduct.findMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
      include: {
        product: true,
      },
    });

    const paymentData = await prisma.payment.findMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
    });

    const ordersWithDetails = myOrders.map((order) => {
      const products = orderedProducts.filter(
        (op) => op.orderId === order.id
      );
      const payment = paymentData.find(
        (payment) => payment.orderId === order.id
      );

      return {
        ...order,
        products: products.map((p) => ({
          id: p.product.id,
          name: p.product.name,
          price: p.product.price,
          quantity: p.quantity,
        })),
        payment: payment || null,
      };
    });

    return ordersWithDetails;
  } else {
    return [];
  }
};

const getOrderFromDB = async (_id: string) => {
  const order = await prisma.order.findUnique({
    where: { id: parseInt(_id) }
  });
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Can't find the order");
  }
  return order;
};

const getAllOrdersFromDB = async () => {
  const orders = await prisma.order.findMany({});
  return orders;
};

const updateOrderIntoDB = async (_id: string, payload: Order) => {
  const updatedOrder = await prisma.order.update({
    where: {
      id: parseInt(_id)
    },
    data: payload
  });
  return updatedOrder;
};


export const OrderServices = {
  createOrderIntoDB,
  getMyOrderFromDB,
  getOrderFromDB,
  updateOrderIntoDB,
  getAllOrdersFromDB
}