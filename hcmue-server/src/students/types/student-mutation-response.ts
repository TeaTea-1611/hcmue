import { ObjectType, Field } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { Student } from '../entities/student.entity';

@ObjectType({ implements: MutationResponse })
export class StudentMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => Student, { nullable: true })
  student?: Student;
}
