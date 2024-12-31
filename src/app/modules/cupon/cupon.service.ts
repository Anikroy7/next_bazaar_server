import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../types/global";


const createCuponIntoDB = async (payload: any) => {
    const { productIds, ...cuponData } = payload
    const result = await prisma.$transaction(async (transactionClient) => {
        const newCupon = await transactionClient.cupon.create({
            data: cuponData
        })
        const cuponProducts = productIds.map((productId: string) => ({
            cuponId: newCupon.id,
            productId,
        }));
        await transactionClient.cuponProduct.createMany({
            data: cuponProducts
        })
        return newCupon
    })

    return result
};

const getAllCuponsFromDB = async () => {
    const allCupons = await prisma.cupon.findMany({
        include: {
            cuponProduct: {
                include: {
                    product: true
                }
            }
        }
    });

    const cuponsWithAppliedProducts = allCupons.map(cupon => ({
        id: cupon.id,
        code: cupon.code,
        discountAmount: cupon.discountAmount,
        isActive: cupon.isActive,
        createdAt: cupon.createdAt,
        updatedAt: cupon.updatedAt,
        appliedProducts: cupon.cuponProduct.map(cuponProduct => cuponProduct.product)
    }));

    return cuponsWithAppliedProducts;
};
const updateCuponIntoDB = async (cuponId: string, data: any) => {

    const cupon = await prisma.cupon.findUnique({ where: { id: parseInt(cuponId) } });

    if (!cupon) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the cupon");
    }
    const result = await prisma.cupon.update({
        where: {
            id: parseInt(cuponId)
        },
        data: data
    });
    return result
};
const deleteCuponIntoDB = async (cuponId: string) => {

    const cupon = await prisma.cupon.findUnique({ where: { id: parseInt(cuponId) } });

    if (!cupon) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the cupon");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.cuponProduct.deleteMany({
            where: {
                cuponId: cupon.id
            }
        })
        await transactionClient.cupon.delete({
            where: {
                id: parseInt(cuponId)
            }
        })
    })
    return result
};


export const CuponServices = {
    createCuponIntoDB,
    getAllCuponsFromDB,
    updateCuponIntoDB,
    deleteCuponIntoDB
};