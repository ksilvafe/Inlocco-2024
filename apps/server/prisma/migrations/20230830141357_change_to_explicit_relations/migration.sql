/*
  Warnings:

  - You are about to drop the `_users_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_users_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_users_saves` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_users_likes" DROP CONSTRAINT "_users_likes_A_fkey";

-- DropForeignKey
ALTER TABLE "_users_likes" DROP CONSTRAINT "_users_likes_B_fkey";

-- DropForeignKey
ALTER TABLE "_users_posts" DROP CONSTRAINT "_users_posts_A_fkey";

-- DropForeignKey
ALTER TABLE "_users_posts" DROP CONSTRAINT "_users_posts_B_fkey";

-- DropForeignKey
ALTER TABLE "_users_saves" DROP CONSTRAINT "_users_saves_A_fkey";

-- DropForeignKey
ALTER TABLE "_users_saves" DROP CONSTRAINT "_users_saves_B_fkey";

-- DropTable
DROP TABLE "_users_likes";

-- DropTable
DROP TABLE "_users_posts";

-- DropTable
DROP TABLE "_users_saves";

-- CreateTable
CREATE TABLE "user_likes" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_likes_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "user_saves" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_saves_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_likes" ADD CONSTRAINT "user_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saves" ADD CONSTRAINT "user_saves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
