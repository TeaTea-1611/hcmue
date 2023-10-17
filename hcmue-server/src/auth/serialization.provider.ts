import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { UserRoleEnumType } from '../users/types/user';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(
    user: User,
    done: (err: Error, user: { id: number; role: UserRoleEnumType }) => void,
  ) {
    done(null, { id: user.id, role: user.role });
  }

  async deserializeUser(
    payload: { id: number },
    done: (err: Error, user: Omit<User, 'password'>) => void,
  ) {
    const user = await User.findOneBy({ id: payload.id });
    done(null, user);
  }
}
