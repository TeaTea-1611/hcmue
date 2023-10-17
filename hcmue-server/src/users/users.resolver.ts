import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserMutationResponse } from './types/user-mutation-response';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/logged-in.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserMutationResponse)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserMutationResponse> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => User)
  @UseGuards(LoggedInGuard)
  async user(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return await User.findOneBy({ id });
  }
}
