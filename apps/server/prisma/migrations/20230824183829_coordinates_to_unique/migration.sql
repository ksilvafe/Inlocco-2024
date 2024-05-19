/*
  Warnings:

  - A unique constraint covering the columns `[coordinates]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "locations_coordinates_key" ON "locations"("coordinates");
