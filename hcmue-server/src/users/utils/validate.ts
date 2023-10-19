import { FieldError } from '../../types/field-error';
import { CreateUserInput } from '../dto/create-user.input';

export const validateCreateUserInput = (
  input: CreateUserInput,
): FieldError[] => {
  const errors: FieldError[] = [];

  if (input.username.length < 6 || input.username.length > 20) {
    errors.push({
      field: 'username',
      message: 'Tài khoản phải có từ 6 đến 20 ký tự',
    });
  }

  if (
    input.password !== null &&
    (input.password.length < 6 || input.password.length > 50)
  ) {
    errors.push({
      field: 'password',
      message: 'Mật khẩu phải có từ 6 đến 50 ký tự',
    });
  }

  return errors;
};
