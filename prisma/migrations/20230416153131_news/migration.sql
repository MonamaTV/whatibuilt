/*
  Warnings:

  - A unique constraint covering the columns `[name,userID]` on the table `Social` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Channels" ADD COLUMN     "devtoId" TEXT,
ADD COLUMN     "dribbleId" TEXT,
ADD COLUMN     "hashnodeId" TEXT,
ADD COLUMN     "twitterId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Social_name_userID_key" ON "Social"("name", "userID");
