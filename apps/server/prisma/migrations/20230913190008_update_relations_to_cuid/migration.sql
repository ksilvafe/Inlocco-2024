/*
  Warnings:

  - The primary key for the `travelers_post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `travelers_post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `travelers_post` table. All the data in the column will be lost.
  - The primary key for the `user_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_likes` table. All the data in the column will be lost.
  - The primary key for the `user_saves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `user_saves` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_saves` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cuid]` on the table `travelers_post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `user_likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cuid]` on the table `user_saves` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `travelers_post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `postCuid` to the `travelers_post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `travelers_post` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `user_likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `postCuid` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - The required column `cuid` was added to the `user_saves` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `postCuid` to the `user_saves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCuid` to the `user_saves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_postId_fkey";

-- DropForeignKey
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_saves" DROP CONSTRAINT "user_saves_postId_fkey";

-- DropForeignKey
ALTER TABLE "user_saves" DROP CONSTRAINT "user_saves_userId_fkey";

-- AlterTable
ALTER TABLE "travelers_post" DROP CONSTRAINT "travelers_post_pkey",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "postCuid" TEXT NOT NULL,
ADD COLUMN     "userCuid" TEXT NOT NULL,
ADD CONSTRAINT "travelers_post_pkey" PRIMARY KEY ("postCuid", "userCuid");

-- AlterTable
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_pkey",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "postCuid" TEXT NOT NULL,
ADD COLUMN     "userCuid" TEXT NOT NULL,
ADD CONSTRAINT "user_likes_pkey" PRIMARY KEY ("postCuid", "userCuid");

-- AlterTable
ALTER TABLE "user_saves" DROP CONSTRAINT "user_saves_pkey",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD COLUMN     "postCuid" TEXT NOT NULL,
ADD COLUMN     "userCuid" TEXT NOT NULL,
ADD CONSTRAINT "user_saves_pkey" PRIMARY KEY ("postCuid", "userCuid");

-- CreateIndex
CREATE UNIQUE INDEX "travelers_post_cuid_key" ON "travelers_post"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_likes_cuid_key" ON "user_likes"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "user_saves_cuid_key" ON "user_saves"("cuid");

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_postCuid_fkey" FOREIGN KEY ("postCuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_postCuid_fkey" FOREIGN KEY ("postCuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_postCuid_fkey" FOREIGN KEY ("postCuid") REFERENCES "posts"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
