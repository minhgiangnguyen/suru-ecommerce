/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "salePrice" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "salePercent" SET DEFAULT 0;
