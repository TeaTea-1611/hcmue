import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { FieldError } from '../../types/field-error';
import { Faculty } from '../entities/faculty.entity';

@ObjectType({ implements: MutationResponse })
export class FacultyMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => Faculty, { nullable: true })
  faculty?: Faculty;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
