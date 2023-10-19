import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { UserRoleEnumType } from '../types/user';

registerEnumType(UserRoleEnumType, {
  name: 'UserRoleEnumType',
});

@InputType()
export class CreateUserInput {
  @Field(() => UserRoleEnumType)
  role: UserRoleEnumType;

  @Field()
  username: string;

  @Field()
  password: string;
}
