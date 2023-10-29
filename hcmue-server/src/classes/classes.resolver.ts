import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { Class } from './entities/class.entity';
import { CreateClassInput } from './dto/create-class.input';
import { ClassMutationResponse } from './types/class-mutation-response';
import { FieldError } from '../types/field-error';
import { Course } from '../courses/entities/course.entity';
import { Faculty } from '../faculties/entities/faculty.entity';
import { IsNull } from 'typeorm';
@Resolver(() => Class)
export class ClassesResolver {
  @Mutation(() => ClassMutationResponse)
  async createClass(
    @Args('createClassInput') input: CreateClassInput,
  ): Promise<ClassMutationResponse> {
    const errors: FieldError[] = [];

    try {
      const existing = await Class.findOneBy({ name: input.name });
      if (existing) throw new Error('The training program already exists.');

      const course = await Course.findOne({ where: { id: input.courseId } });
      if (!course)
        errors.push({
          field: 'course',
          message: 'The course not found.',
        });
      const faculty = await Faculty.findOne({ where: { id: input.facultyId } });
      if (!faculty)
        errors.push({
          field: 'faculty',
          message: 'Faculty not found.',
        });
      if (errors.length)
        return {
          success: false,
          errors,
        };

      const newClass = Class.create({
        name: input.name,
        course,
        faculty,
      });
      await newClass.save();

      return {
        success: true,
        message: 'Class has been created successfully.',
        class: newClass,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Query(() => [Class])
  async classes(
    @Args('facultyId', { type: () => ID, nullable: true }) facultyId?: number,
    @Args('courseId', { type: () => ID, nullable: true }) courseId?: number,
  ): Promise<Class[]> {
    return await Class.find({
      where: {
        faculty: { id: facultyId ? facultyId : IsNull() },
        course: { id: courseId ? courseId : IsNull() },
      },
    });
  }
}
