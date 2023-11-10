INSERT INTO "Role" ("id", "name") VALUES 
('R01', 'Quản trị'),
('R02', 'Ban lãnh đạo'), 
('R03', 'Nhân viên'), 
('R04', 'Giảng viên'), 
('R05', 'Sinh viên');

INSERT INTO "Position" ("id", "name", "roleId") VALUES
('R02.01', 'Hiệu trưởng', 'R02'),
('R02.02', 'Hiệu phó', 'R02'),
('R03.01', 'Bình thường', 'R03'),
('R05.01', 'Bình thường', 'R05'),
('R05.02', 'Lớp trưởng', 'R05');

INSERT INTO "Faculty" ("id", "name", "address", "email", "numberPhone") VALUES 
('COMP', 'Khoa Công nghệ Thông tin', '', '', ''),
('GEOG', 'Khoa Địa lý', '', '', ''),
('POLI', 'Khoa Giáo dục Chính trị', '', '', ''),
('SPEC', 'Khoa Giáo dục Đặc biệt', '', '', ''),
('EARC', 'Khoa Giáo dục Mầm non', '', '', ''),
('DEFN', 'Khoa Giáo dục Quốc phòng', '', '', ''),
('PHYL', 'Khoa Giáo dục Thể chất', '', '', ''),
('PRIM', 'Khoa Giáo dục Tiểu học', '', '', '');

INSERT INTO "Course" ("name") VALUES 
('Khóa 47 (2021)'),
('Khóa 48 (2022)'),
('Khóa 49 (2023)');

INSERT INTO "AcademicYear" ("name") VALUES
('2021-2022'),
('2022-2023'),
('2023-2024');

INSERT INTO "TrainingSystem" ("name") VALUES
('Đại học'),
('Chuyên đề');

INSERT INTO "TrainingType" ("name", "trainingSystemId") VALUES
('Chính quy', 1),
('Vừa học vừa làm', 1);

INSERT INTO "TrainingProgram" ("name") VALUES
('Công nghệ thông tin'),
('Công nghệ thông tin - Công nghệ phần mềm'),
('Công nghệ thông tin - Khoa học máy tính');

INSERT INTO "TrainingField" ("name", "facultyId", "trainingSystemId", "trainingTypeId") VALUES
('Công nghệ thông tin', 'COMP', 1, 1);

INSERT INTO "TrainingFieldToCourse" ("trainingFieldId", "courseId") VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO "TrainingFieldToProgramToCourse" ("trainingFieldId", "trainingProgramId", "courseId") VALUES
(1,1, 1),
(1,1, 2),
(1,1, 3);