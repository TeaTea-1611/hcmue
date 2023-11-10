/*
  Warnings:

  - Added the required column `trainingSystemId` to the `TrainingType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingType" ADD COLUMN     "trainingSystemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TrainingType" ADD CONSTRAINT "TrainingType_trainingSystemId_fkey" FOREIGN KEY ("trainingSystemId") REFERENCES "TrainingSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
