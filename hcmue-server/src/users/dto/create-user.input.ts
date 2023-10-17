import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { UserRoleEnumType } from '../types/user';

registerEnumType(UserRoleEnumType, {
  name: 'UserRoleEnumType',
});

@InputType()
export class CreateUserInput {
  @Field(() => UserRoleEnumType)
  role: UserRoleEnumType;

  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(20, { message: 'Tối đa 20 ký tự' })
  @Field()
  username: string;

  @MinLength(6, { message: 'Tối thiểu 6 ký tự' })
  @MaxLength(50, { message: 'Tối đa 50 ký tự' })
  @Field()
  password: string;
}
