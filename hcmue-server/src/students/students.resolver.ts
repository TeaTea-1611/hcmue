import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { StudentMutationResponse } from './types/student-mutation-response';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Mutation(() => StudentMutationResponse)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
    @Context() { req },
  ): Promise<StudentMutationResponse> {
    return this.studentsService.create(createStudentInput, req);
  }
}
