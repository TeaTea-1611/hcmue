import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserMutationResponse } from './types/user-mutation-response';
import { FieldError } from '../types/field-error';
import { length } from '../utils/validate';

@Injectable()
export class UsersService {
  constructor(private readonly mailerService: MailerService) {}

  async create({
    username,
    password,
    role,
  }: CreateUserInput): Promise<UserMutationResponse> {
    try {
      const errors: FieldError[] = [];

      const errorUsername = length('username', username, 6, 20);
      const errorPassword = length('password', password, 6, 50);

      if (errorUsername) errors.push(errorUsername);
      if (errorPassword) errors.push(errorPassword);

      if (errors.length)
        return {
          success: false,
          errors,
        };

      const existing = await User.findOne({
        where: { username: username },
        select: { id: true },
      });
      if (existing)
        return {
          success: false,
          errors: [{ field: 'username', message: 'Account already exists.' }],
        };

      const hashPassword = await argon2.hash(password);

      const user = User.create({ role, username, password: hashPassword });

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
