/*
  Warnings:

  - You are about to drop the column `authorName` on the `ReviewReply` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `ReviewReply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ReviewReply" DROP COLUMN "authorName",
DROP COLUMN "avatarUrl";
