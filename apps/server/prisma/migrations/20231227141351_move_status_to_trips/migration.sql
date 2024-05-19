/*
  Warnings:

  - You are about to drop the column `status` on the `posts` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('FILED', 'PUBLISHED', 'SKETCH');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'SKETCH';

-- DropEnum
DROP TYPE "PostStatus";
