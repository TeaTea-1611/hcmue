import { Field, ObjectType } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { FieldError } from '../../types/field-error';
import { Class } from '../entities/class.entity';

@ObjectType({ implements: MutationResponse })
export class ClassMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => Class, { nullable: true })
  class?: Class;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
