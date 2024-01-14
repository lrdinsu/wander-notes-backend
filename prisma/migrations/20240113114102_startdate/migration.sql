/*
  Warnings:

  - You are about to drop the column `startDates` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "startDates";

-- CreateTable
CREATE TABLE "StartDate" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "StartDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StartDate" ADD CONSTRAINT "StartDate_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
