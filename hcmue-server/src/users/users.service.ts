import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserMutationResponse } from './types/user-mutation-response';
import { validateCreateUserInput } from './utils/validate';

@Injectable()
export class UsersService {
  constructor(private readonly mailerService: MailerService) {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserMutationResponse> {
    try {
      const errors = validateCreateUserInput(createUserInput);
      if (errors.length)
        return {
          success: false,
          errors,
        };

      const existing = await User.findOne({
        where: { username: createUserInput.username },
        select: { id: true },
      });
      if (existing)
        return {
          success: false,
          errors: [{ field: 'username', message: 'Account already exists.' }],
        };

      const hashPassword = await argon2.hash(createUserInput.password);

      const user = User.create({ ...createUserInput, password: hashPassword });

      await user.save();

      return {
        success: true,
        message: 'Account created successfully.',
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async forgotPassword(username: string): Promise<UserMutationResponse> {
    try {
      await this.mailerService.sendMail({
        to: 'phamnam079202038134@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'forgot-password',
        context: {
          code: 'cf1a3f828287',
          name: 'Nam Pham',
        },
      });

      return {
        success: true,
        message: 'Please check your email.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
