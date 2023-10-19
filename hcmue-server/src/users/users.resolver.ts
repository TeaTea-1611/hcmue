import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserMutationResponse } from './types/user-mutation-response';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserMutationResponse)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserMutationResponse> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => UserMutationResponse)
  async forgotPassword(
    @Args('username', { type: () => String }) username: string,
  ): Promise<UserMutationResponse> {
    return await this.usersService.forgotPassword(username);
  }

  @Query(() => User)
  @UseGuards(LoggedInGuard)
  async user(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return await User.findOneBy({ id });
  }
}
