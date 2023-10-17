import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserMutationResponse } from '../users/types/user-mutation-response';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { COOKIE_NAME } from '../constants';
import { User } from '../users/entities/user.entity';
import { LoggedInGuard } from './logged-in.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserMutationResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): UserMutationResponse {
    return {
      success: true,
      message: 'Đăng nhập thành công',
      user: context.req.user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Context() context): Promise<Boolean> {
    return new Promise((resolve, _reject) => {
      context.req.session.destroy((error) => {
        if (error) {
          console.log('DESTROYING SESSION ERROR', error);
          resolve(false);
        }

        // bug express-session v0.6.0
        context.req.logout((error) => {
          if (error) {
            // console.log('LOGOUT ERROR', error);
            // resolve(false);

            context.res.clearCookie(COOKIE_NAME);
            resolve(true);
          }
          resolve(true);
        });
      });
    });
  }

  @Query(() => User)
  @UseGuards(LoggedInGuard)
  me(@Context() context): Promise<User> {
    return context.req.user;
  }
}
