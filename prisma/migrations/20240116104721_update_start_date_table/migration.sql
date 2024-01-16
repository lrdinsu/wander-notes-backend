/*
  Warnings:

  - You are about to drop the `startDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "startDate" DROP CONSTRAINT "startDate_tourId_fkey";

-- DropTable
DROP TABLE "startDate";

-- CreateTable
CREATE TABLE "start_date" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "tourId" INTEGER NOT NULL,

    CONSTRAINT "start_date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "start_date" ADD CONSTRAINT "start_date_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
