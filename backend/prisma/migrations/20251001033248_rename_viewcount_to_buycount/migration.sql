/*
  Warnings:

  - You are about to drop the column `viewCount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "viewCount",
ADD COLUMN     "buyCount" INTEGER NOT NULL DEFAULT 0;
