import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string) {
    const user = await User.findOneBy({ username });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }
    return user;
  }
}
