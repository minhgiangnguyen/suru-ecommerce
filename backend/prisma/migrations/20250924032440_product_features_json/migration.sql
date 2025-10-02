/*
  Warnings:

  - You are about to drop the `ProductFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductFeature" DROP CONSTRAINT "ProductFeature_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "features" JSONB;

-- DropTable
DROP TABLE "public"."ProductFeature";
