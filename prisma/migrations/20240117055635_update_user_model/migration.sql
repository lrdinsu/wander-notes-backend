/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "updatedAt",
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3);
