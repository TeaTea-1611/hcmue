import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersResolver } from './lecturers.resolver';

@Module({
  providers: [LecturersResolver, LecturersService]
})
export class LecturersModule {}
