import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthSerializer } from './serialization.provider';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    AuthSerializer,
    RolesGuard,
  ],
})
export class AuthModule {}
