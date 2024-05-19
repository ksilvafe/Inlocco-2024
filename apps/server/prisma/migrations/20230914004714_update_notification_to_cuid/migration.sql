/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `recipient_cuid` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_cuid` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_post_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sender_id_fkey";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "recipient_id",
DROP COLUMN "sender_id",
ADD COLUMN     "recipient_cuid" TEXT NOT NULL,
ADD COLUMN     "sender_cuid" TEXT NOT NULL,
ALTER COLUMN "post_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_sender_cuid_fkey" FOREIGN KEY ("sender_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_cuid_fkey" FOREIGN KEY ("recipient_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;
