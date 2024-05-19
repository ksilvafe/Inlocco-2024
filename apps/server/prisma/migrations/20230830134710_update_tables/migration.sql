/*
  Warnings:

  - You are about to drop the column `city_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `continent_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `country_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `_users_trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `citys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `continents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_users_trips" DROP CONSTRAINT "_users_trips_A_fkey";

-- DropForeignKey
ALTER TABLE "_users_trips" DROP CONSTRAINT "_users_trips_B_fkey";

-- DropForeignKey
ALTER TABLE "countries" DROP CONSTRAINT "countries_continent_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_city_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_continent_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_country_id_fkey";

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "city_id",
DROP COLUMN "continent_id",
DROP COLUMN "country_id",
DROP COLUMN "title",
ADD COLUMN     "purpose" TEXT[];

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "end_date",
DROP COLUMN "purpose",
DROP COLUMN "start_date";

-- DropTable
DROP TABLE "_users_trips";

-- DropTable
DROP TABLE "citys";

-- DropTable
DROP TABLE "continents";

-- DropTable
DROP TABLE "countries";

-- CreateTable
CREATE TABLE "travelers_post" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travelers_post_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelers_post" ADD CONSTRAINT "travelers_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
