import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { StudentEnumType, StudyStatusEnumType } from '../types/student';

registerEnumType(StudentEnumType, {
  name: 'StudentEnumType',
});

registerEnumType(StudyStatusEnumType, {
  name: 'StudyStatusEnumType',
});

@InputType()
export class CreateStudentInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  gender: number;

  @Field(() => StudentEnumType)
  studentType: StudentEnumType;

  @Field(() => StudyStatusEnumType)
  studyStatus: StudyStatusEnumType;

  @Field(() => ID)
  facultyId: number;

  @Field(() => ID)
  courseId: number;

  @Field(() => ID)
  classId: number;
}
