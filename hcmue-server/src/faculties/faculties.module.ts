import { Module } from '@nestjs/common';
import { FacultiesResolver } from './faculties.resolver';

@Module({
  providers: [FacultiesResolver],
})
export class FacultiesModule {}
