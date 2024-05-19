-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_location_id_fkey";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "location_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
