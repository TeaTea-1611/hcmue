import { Module } from '@nestjs/common';
import { ClassesResolver } from './classes.resolver';

@Module({
  providers: [ClassesResolver],
})
export class ClassesModule {}
