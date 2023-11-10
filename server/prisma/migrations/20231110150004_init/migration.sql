/*
  Warnings:

  - Added the required column `dob` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberPhone` to the `Lecturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lecturer" ADD COLUMN     "dob" VARCHAR(10) NOT NULL,
ADD COLUMN     "email" VARCHAR NOT NULL,
ADD COLUMN     "facultyId" VARCHAR(4) NOT NULL,
ADD COLUMN     "numberPhone" VARCHAR(15) NOT NULL;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
