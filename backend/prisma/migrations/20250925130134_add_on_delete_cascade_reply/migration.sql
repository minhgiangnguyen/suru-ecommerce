-- DropForeignKey
ALTER TABLE "public"."ReviewReply" DROP CONSTRAINT "ReviewReply_reviewId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ReviewReply" ADD CONSTRAINT "ReviewReply_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "public"."Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
