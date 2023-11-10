-- CreateTable
CREATE TABLE "Role" (
    "id" VARCHAR(5) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" TEXT NOT NULL,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentType" VARCHAR(50) NOT NULL,
    "studyStatus" VARCHAR(50) NOT NULL,
    "gender" INTEGER NOT NULL,
    "dob" VARCHAR(10) NOT NULL,
    "pob" VARCHAR(100) NOT NULL,
    "ethnicity" VARCHAR(100) NOT NULL,
    "identification" VARCHAR(20) NOT NULL,
    "religion" TEXT NOT NULL,
    "area" VARCHAR(50) NOT NULL,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "province" VARCHAR(50) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "permanentAddress" VARCHAR NOT NULL,
    "numberPhone" VARCHAR(15) NOT NULL,
    "email" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "fatherName" VARCHAR(100) NOT NULL,
    "motherName" VARCHAR(100) NOT NULL,
    "relativeName" VARCHAR(100) NOT NULL,
    "relativeNumberPhone" VARCHAR(15) NOT NULL,
    "relativeAddress" VARCHAR NOT NULL,
    "classId" INTEGER NOT NULL,
    "positionId" TEXT,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "facultyId" VARCHAR(4) NOT NULL,
    "trainingFieldId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "positionId" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" VARCHAR(4) NOT NULL,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "numberPhone" VARCHAR(15) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingField" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "facultyId" TEXT NOT NULL,
    "trainingSystemId" INTEGER NOT NULL,
    "trainingTypeId" INTEGER NOT NULL,

    CONSTRAINT "TrainingField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSystem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "TrainingSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "TrainingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingFieldToCourse" (
    "courseId" INTEGER NOT NULL,
    "trainingFieldId" INTEGER NOT NULL,

    CONSTRAINT "TrainingFieldToCourse_pkey" PRIMARY KEY ("trainingFieldId","courseId")
);

-- CreateTable
CREATE TABLE "TrainingFieldToProgramToCourse" (
    "trainingFieldId" INTEGER NOT NULL,
    "trainingProgramId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "TrainingFieldToProgramToCourse_pkey" PRIMARY KEY ("trainingFieldId","trainingProgramId","courseId")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "courseId" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "academicYearId" INTEGER NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" VARCHAR(8) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "credits" INTEGER NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleClass" (
    "id" SERIAL NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "schoolDay" INTEGER NOT NULL,
    "classStart" INTEGER NOT NULL,
    "classEnd" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startEnd" TIMESTAMP(3) NOT NULL,
    "maximum" INTEGER NOT NULL,
    "testDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lecturerId" INTEGER NOT NULL,
    "room" TEXT,
    "moduleId" TEXT NOT NULL,
    "academicYearId" INTEGER,

    CONSTRAINT "ModuleClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "studentId" VARCHAR(20) NOT NULL,
    "moduleClassId" INTEGER NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("moduleClassId","studentId")
);

-- CreateTable
CREATE TABLE "TuitionFee" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" VARCHAR(20) NOT NULL,
    "moduleClassId" INTEGER NOT NULL,

    CONSTRAINT "TuitionFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleGrades" (
    "id" SERIAL NOT NULL,
    "moduleClassId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "ModuleGrades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentToModuleGrades" (
    "scores" INTEGER NOT NULL,
    "moduleGradesId" INTEGER NOT NULL,
    "studentId" VARCHAR(20) NOT NULL,

    CONSTRAINT "StudentToModuleGrades_pkey" PRIMARY KEY ("studentId","moduleGradesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_userId_key" ON "Lecturer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingField_name_key" ON "TrainingField"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSystem_name_key" ON "TrainingSystem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingType_name_key" ON "TrainingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingProgram_name_key" ON "TrainingProgram"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicYear_name_key" ON "AcademicYear"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleGrades_moduleClassId_name_key" ON "ModuleGrades"("moduleClassId", "name");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_trainingFieldId_fkey" FOREIGN KEY ("trainingFieldId") REFERENCES "TrainingField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD CONSTRAINT "Lecturer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingField" ADD CONSTRAINT "TrainingField_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingField" ADD CONSTRAINT "TrainingField_trainingSystemId_fkey" FOREIGN KEY ("trainingSystemId") REFERENCES "TrainingSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingField" ADD CONSTRAINT "TrainingField_trainingTypeId_fkey" FOREIGN KEY ("trainingTypeId") REFERENCES "TrainingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFieldToCourse" ADD CONSTRAINT "TrainingFieldToCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFieldToCourse" ADD CONSTRAINT "TrainingFieldToCourse_trainingFieldId_fkey" FOREIGN KEY ("trainingFieldId") REFERENCES "TrainingField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFieldToProgramToCourse" ADD CONSTRAINT "TrainingFieldToProgramToCourse_trainingFieldId_fkey" FOREIGN KEY ("trainingFieldId") REFERENCES "TrainingField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFieldToProgramToCourse" ADD CONSTRAINT "TrainingFieldToProgramToCourse_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingFieldToProgramToCourse" ADD CONSTRAINT "TrainingFieldToProgramToCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semester" ADD CONSTRAINT "Semester_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleClass" ADD CONSTRAINT "ModuleClass_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleClass" ADD CONSTRAINT "ModuleClass_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleClass" ADD CONSTRAINT "ModuleClass_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleClass" ADD CONSTRAINT "ModuleClass_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_moduleClassId_fkey" FOREIGN KEY ("moduleClassId") REFERENCES "ModuleClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionFee" ADD CONSTRAINT "TuitionFee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuitionFee" ADD CONSTRAINT "TuitionFee_moduleClassId_fkey" FOREIGN KEY ("moduleClassId") REFERENCES "ModuleClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_moduleClassId_fkey" FOREIGN KEY ("moduleClassId") REFERENCES "ModuleClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentToModuleGrades" ADD CONSTRAINT "StudentToModuleGrades_moduleGradesId_fkey" FOREIGN KEY ("moduleGradesId") REFERENCES "ModuleGrades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentToModuleGrades" ADD CONSTRAINT "StudentToModuleGrades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
