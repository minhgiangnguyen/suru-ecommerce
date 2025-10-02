/*
  Warnings:

  - You are about to drop the column `quantityLabelId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `QuantityLabel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_quantityLabelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuantityLabel" DROP CONSTRAINT "QuantityLabel_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "quantityLabelId";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "details" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "purchase_options" JSONB;

-- DropTable
DROP TABLE "public"."QuantityLabel";
