import { ObjectType, Field } from '@nestjs/graphql';
import { MutationResponse } from '../../types/mutation-response';
import { User } from '../entities/user.entity';

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  success: boolean;
  message?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
