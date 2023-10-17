import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UserMutationResponse } from './types/user-mutation-response';

@Injectable()
export class UsersService {
  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserMutationResponse> {
    try {
      const existing = await User.findOne({
        where: { username: createUserInput.username },
        select: { id: true },
      });
      if (existing) throw new Error('Tài khoản đã tồn tại');

      const hashPassword = await argon2.hash(createUserInput.password);

      const user = User.create({ ...createUserInput, password: hashPassword });

      await user.save();

      return {
        success: true,
        message: 'Tài khoản được tạo thành công',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
