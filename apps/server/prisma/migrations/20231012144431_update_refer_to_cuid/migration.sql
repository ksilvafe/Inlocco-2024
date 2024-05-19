/*
  Warnings:

  - You are about to drop the column `profile_id` on the `adresses` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `follower_id` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_cuid]` on the table `adresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_cuid]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_cuid` to the `adresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_cuid` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cuid` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_cuid` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_cuid` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cuid` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_following_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_location_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_trip_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropIndex
DROP INDEX "adresses_profile_id_key";

-- DropIndex
DROP INDEX "profiles_user_id_key";

-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "profile_id",
ADD COLUMN     "profile_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "post_id",
DROP COLUMN "user_id",
ADD COLUMN     "post_cuid" TEXT NOT NULL,
ADD COLUMN     "user_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "follows" DROP COLUMN "follower_id",
DROP COLUMN "following_id",
ADD COLUMN     "follower_cuid" TEXT NOT NULL,
ADD COLUMN     "following_cuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "post_id",
ADD COLUMN     "post_cuid" TEXT;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "location_id",
DROP COLUMN "trip_id",
ADD COLUMN     "location_cuid" TEXT,
ADD COLUMN     "trip_cuid" TEXT;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "user_id",
ADD COLUMN     "user_cuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adresses_profile_cuid_key" ON "adresses"("profile_cuid");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_cuid_key" ON "profiles"("user_cuid");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_profile_cuid_fkey" FOREIGN KEY ("profile_cuid") REFERENCES "profiles"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_trip_cuid_fkey" FOREIGN KEY ("trip_cuid") REFERENCES "trips"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_location_cuid_fkey" FOREIGN KEY ("location_cuid") REFERENCES "locations"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_cuid_fkey" FOREIGN KEY ("post_cuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_cuid_fkey" FOREIGN KEY ("follower_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_cuid_fkey" FOREIGN KEY ("following_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_post_cuid_fkey" FOREIGN KEY ("post_cuid") REFERENCES "posts"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;
