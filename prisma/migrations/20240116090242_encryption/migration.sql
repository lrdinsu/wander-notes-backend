/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_passwordHash_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordHash";
