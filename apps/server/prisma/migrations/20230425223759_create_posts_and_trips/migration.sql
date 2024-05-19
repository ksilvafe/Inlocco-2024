/*
  Warnings:

  - You are about to drop the column `profiles_id` on the `adresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `adresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `adresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('FILED', 'PUBLISHED', 'SKETCH');

-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_profiles_id_fkey";

-- DropIndex
DROP INDEX "adresses_profiles_id_key";

-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "profiles_id",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "purpose" TEXT[],
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "continents" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "name" TEXT,
    "code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "continents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "name" TEXT,
    "code" TEXT,
    "flag" TEXT,
    "continent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citys" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "citys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "photos" TEXT[],
    "videos" TEXT[],
    "status" "PostStatus" NOT NULL DEFAULT 'SKETCH',
    "shares" BIGINT NOT NULL DEFAULT 0,
    "trip_id" INTEGER,
    "continent_id" INTEGER,
    "country_id" INTEGER,
    "city_id" INTEGER,
    "location_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Point',
    "coordinates" DOUBLE PRECISION[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_users_trips" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_users_likes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_users_saves" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_users_posts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "trips_cuid_key" ON "trips"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "continents_cuid_key" ON "continents"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "continents_name_key" ON "continents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "continents_code_key" ON "continents"("code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_cuid_key" ON "countries"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_flag_key" ON "countries"("flag");

-- CreateIndex
CREATE UNIQUE INDEX "citys_cuid_key" ON "citys"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "citys_name_key" ON "citys"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_cuid_key" ON "posts"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "comments_cuid_key" ON "comments"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "locations_cuid_key" ON "locations"("cuid");

-- CreateIndex
CREATE UNIQUE INDEX "_users_trips_AB_unique" ON "_users_trips"("A", "B");

-- CreateIndex
CREATE INDEX "_users_trips_B_index" ON "_users_trips"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_users_likes_AB_unique" ON "_users_likes"("A", "B");

-- CreateIndex
CREATE INDEX "_users_likes_B_index" ON "_users_likes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_users_saves_AB_unique" ON "_users_saves"("A", "B");

-- CreateIndex
CREATE INDEX "_users_saves_B_index" ON "_users_saves"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_users_posts_AB_unique" ON "_users_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_users_posts_B_index" ON "_users_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "adresses_profile_id_key" ON "adresses"("profile_id");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_continent_id_fkey" FOREIGN KEY ("continent_id") REFERENCES "continents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_continent_id_fkey" FOREIGN KEY ("continent_id") REFERENCES "continents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "citys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_trips" ADD CONSTRAINT "_users_trips_A_fkey" FOREIGN KEY ("A") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_trips" ADD CONSTRAINT "_users_trips_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_likes" ADD CONSTRAINT "_users_likes_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_likes" ADD CONSTRAINT "_users_likes_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_saves" ADD CONSTRAINT "_users_saves_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_saves" ADD CONSTRAINT "_users_saves_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_posts" ADD CONSTRAINT "_users_posts_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users_posts" ADD CONSTRAINT "_users_posts_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
