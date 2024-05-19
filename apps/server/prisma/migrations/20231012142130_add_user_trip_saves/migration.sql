/*
  Warnings:

  - The primary key for the `travelers_post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postCuid` on the `travelers_post` table. All the data in the column will be lost.
  - You are about to drop the column `userCuid` on the `travelers_post` table. All the data in the column will be lost.
  - The primary key for the `user_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postCuid` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userCuid` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the `user_saves` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_cuid` to the `travelers_post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cuid` to the `travelers_post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_cuid` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_cuid` to the `user_likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_postCuid_fkey";

-- DropForeignKey
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_userCuid_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_postCuid_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_userCuid_fkey";

-- DropForeignKey
ALTER TABLE "user_saves" DROP CONSTRAINT "user_saves_postCuid_fkey";

-- DropForeignKey
ALTER TABLE "user_saves" DROP CONSTRAINT "user_saves_userCuid_fkey";

-- AlterTable
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_pkey",
DROP COLUMN "postCuid",
DROP COLUMN "userCuid",
ADD COLUMN     "post_cuid" TEXT NOT NULL,
ADD COLUMN     "user_cuid" TEXT NOT NULL,
ADD CONSTRAINT "travelers_post_pkey" PRIMARY KEY ("post_cuid", "user_cuid");

-- AlterTable
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_pkey",
DROP COLUMN "postCuid",
DROP COLUMN "userCuid",
ADD COLUMN     "post_cuid" TEXT NOT NULL,
ADD COLUMN     "user_cuid" TEXT NOT NULL,
ADD CONSTRAINT "user_likes_pkey" PRIMARY KEY ("post_cuid", "user_cuid");

-- DropTable
DROP TABLE "user_saves";

-- CreateTable
CREATE TABLE "user_post_saves" (
    "cuid" TEXT NOT NULL,
    "post_cuid" TEXT NOT NULL,
    "user_cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_post_saves_pkey" PRIMARY KEY ("post_cuid","user_cuid")
);

-- CreateTable
CREATE TABLE "user_trip_saves" (
    "cuid" TEXT NOT NULL,
    "trip_cuid" TEXT NOT NULL,
    "user_cuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_trip_saves_pkey" PRIMARY KEY ("trip_cuid","user_cuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_post_saves_cuid_key" ON "user_post_saves"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_trip_saves_cuid_key" ON "user_trip_saves"("cuid");

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_post_cuid_fkey" FOREIGN KEY ("post_cuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_post_cuid_fkey" FOREIGN KEY ("post_cuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post_saves" ADD CONSTRAINT "user_post_saves_post_cuid_fkey" FOREIGN KEY ("post_cuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post_saves" ADD CONSTRAINT "user_post_saves_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_trip_saves" ADD CONSTRAINT "user_trip_saves_trip_cuid_fkey" FOREIGN KEY ("trip_cuid") REFERENCES "trips"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_trip_saves" ADD CONSTRAINT "user_trip_saves_user_cuid_fkey" FOREIGN KEY ("user_cuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
