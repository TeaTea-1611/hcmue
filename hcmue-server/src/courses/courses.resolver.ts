import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRoleEnumType } from '../users/types/user';
import { CourseMutationResponse } from './types/course-mutation-response';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => CourseMutationResponse)
  @Roles(UserRoleEnumType.Admin)
  @UseGuards(RolesGuard)
  createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseInput,
  ): Promise<CourseMutationResponse> {
    return this.coursesService.create(createCourseInput);
  }
}
