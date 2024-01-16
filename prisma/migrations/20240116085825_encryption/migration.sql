/*
  Warnings:

  - A unique constraint covering the columns `[passwordHash]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "passwordHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_passwordHash_key" ON "user"("passwordHash");
