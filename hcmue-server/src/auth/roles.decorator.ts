// Tạo một trang trí @Roles() bằng cách sử dụng hàm SetMetadata()
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
