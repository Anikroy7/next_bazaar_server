-- CreateTable
CREATE TABLE "VendorFollow" (
    "vendorId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "VendorFollow_pkey" PRIMARY KEY ("vendorId","customerId")
);

-- AddForeignKey
ALTER TABLE "VendorFollow" ADD CONSTRAINT "VendorFollow_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFollow" ADD CONSTRAINT "VendorFollow_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
