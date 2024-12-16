/*
  Warnings:

  - The primary key for the `VendorFollow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VendorFollow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorFollow" DROP CONSTRAINT "VendorFollow_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "VendorFollow_pkey" PRIMARY KEY ("vendorId", "customerId");
