-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "formImage" TEXT,
ADD COLUMN     "topImage" TEXT,
ALTER COLUMN "favicon" DROP NOT NULL;
