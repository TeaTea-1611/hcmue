import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRoleEnumType } from '../users/types/user';
import { CreateCourseInput } from './dto/create-course.input';
import { Course } from './entities/course.entity';
import { CourseMutationResponse } from './types/course-mutation-response';

@Resolver(() => Course)
export class CoursesResolver {
  @Mutation(() => CourseMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  async createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
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
}
