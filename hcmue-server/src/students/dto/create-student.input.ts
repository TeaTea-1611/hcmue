import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { StudentEnumType, StudyStatusEnumType } from '../types/student';

registerEnumType(StudentEnumType, {
  name: 'StudentEnumType',
});

registerEnumType(StudyStatusEnumType, {
  name: 'StudyStatusEnumType',
});

@InputType()
export class CreateStudentInput {
  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(20, { message: 'Tối đa 20 ký tự' })
  @Field()
  id: string;

  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(100, { message: 'Tối đa 100 ký tự' })
  @Field()
  name: string;

  @Field(() => Int)
  gender: number;

  @Field(() => StudentEnumType)
  studentType: StudentEnumType;

  @Field(() => StudyStatusEnumType)
  studyStatus: StudyStatusEnumType;
}
