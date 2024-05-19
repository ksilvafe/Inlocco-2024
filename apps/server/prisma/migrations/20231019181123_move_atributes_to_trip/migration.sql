/*
  Warnings:

  - You are about to drop the column `post_cuid` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `post_cuid` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `shares` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `user_likes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trip_cuid` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cuid` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_cuid_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_post_cuid_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_post_cuid_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_user_cuid_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "post_cuid",
ADD COLUMN     "trip_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "post_cuid",
ADD COLUMN     "trip_cuid" TEXT;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "period",
DROP COLUMN "shares";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "name",
ADD COLUMN     "shares" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "user_cuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_likes";

-- CreateTable
CREATE TABLE "user_trip_likes" (
    "cuid" TEXT NOT NULL,
    "trip_cuid" TEXT NOT NULL,
    "user_cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_trip_likes_pkey" PRIMARY KEY ("trip_cuid","user_cuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_trip_likes_cuid_key" ON "user_trip_likes"("cuid");

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_trip_cuid_fkey" FOREIGN KEY ("trip_cuid") REFERENCES "trips"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_trip_cuid_fkey" FOREIGN KEY ("trip_cuid") REFERENCES "trips"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_trip_likes" ADD CONSTRAINT "user_trip_likes_trip_cuid_fkey" FOREIGN KEY ("trip_cuid") REFERENCES "trips"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_trip_likes" ADD CONSTRAINT "user_trip_likes_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
