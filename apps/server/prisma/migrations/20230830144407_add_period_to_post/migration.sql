/*
  Warnings:

  - You are about to drop the column `localization` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "period" TEXT;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "localization";
