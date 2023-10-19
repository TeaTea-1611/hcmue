import { Injectable } from '@nestjs/common';
import { CreateCourseInput } from './dto/create-course.input';
import { CourseMutationResponse } from './types/course-mutation-response';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  async create(
    createCourseInput: CreateCourseInput,
  ): Promise<CourseMutationResponse> {
    try {
      const existing = await Course.findOne({
        where: { name: createCourseInput.name, year: createCourseInput.year },
      });
      if (existing) throw new Error('The course already exists.');
      const course = Course.create({ ...createCourseInput });
      await course.save();
      return {
        success: true,
        message: 'The course has been created successfully.',
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
