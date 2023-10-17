import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { Student } from './entities/student.entity';
import { StudentMutationResponse } from './types/student-mutation-response';

@Injectable()
export class StudentsService {
  constructor(private dataSource: DataSource) {}

  async create(
    createStudentInput: CreateStudentInput,
    req: any,
  ): Promise<StudentMutationResponse> {
    try {
      const existing = await Student.findOne({
        where: { id: createStudentInput.id },
        select: { id: true },
      });
      if (existing) throw new Error('Mã số sinh viên đã tồn tại');

      const student = Student.create({
        ...createStudentInput,
      });
      await student.save();
      req.session.userId = student.id;
      return {
        success: true,
        message: 'Sinh viên được tạo thành công',
        student,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update() {}
}
