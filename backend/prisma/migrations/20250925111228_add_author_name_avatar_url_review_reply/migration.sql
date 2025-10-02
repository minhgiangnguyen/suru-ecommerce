/*
  Warnings:

  - Added the required column `authorName` to the `ReviewReply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `ReviewReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ReviewReply" ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "avatarUrl" TEXT NOT NULL;
