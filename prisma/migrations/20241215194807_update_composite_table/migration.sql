/*
  Warnings:

  - The primary key for the `VendorFollow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `productReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vendorReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "VendorFollow" DROP CONSTRAINT "VendorFollow_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VendorFollow_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "productReviews" DROP CONSTRAINT "productReviews_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "productReviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "vendorReviews" DROP CONSTRAINT "vendorReviews_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "vendorReviews_pkey" PRIMARY KEY ("id");
