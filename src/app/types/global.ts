import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export type TProductFilterableFields = {
    vendorId?: string | undefined;
    searchTerm?: string | undefined;
    priceRange?: string | undefined;
}

export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}