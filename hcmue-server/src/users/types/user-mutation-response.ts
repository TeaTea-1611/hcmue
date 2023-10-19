import { ObjectType, Field } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { User } from '../entities/user.entity';
import { FieldError } from '../../types/field-error';

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
