import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../users/entities/user.entity';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<User> {
    const user = await User.findOneBy({ username });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new GraphQLError('Incorrect username or password.', {
        extensions: { code: 'LOGIN_FAIL' },
      });
    }
    return user;
  }
}
