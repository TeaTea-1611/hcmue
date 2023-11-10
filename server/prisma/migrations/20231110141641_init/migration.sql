/*
  Warnings:

  - The primary key for the `Lecturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academicYearId` on the `ModuleClass` table. All the data in the column will be lost.
  - Made the column `userId` on table `Lecturer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_userId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleClass" DROP CONSTRAINT "ModuleClass_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleClass" DROP CONSTRAINT "ModuleClass_lecturerId_fkey";

-- AlterTable
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lecturer_id_seq";

-- AlterTable
ALTER TABLE "ModuleClass" DROP COLUMN "academicYearId",
ALTER COLUMN "lecturerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleClass" ADD CONSTRAINT "ModuleClass_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
