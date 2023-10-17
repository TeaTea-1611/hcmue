import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LecturersService } from './lecturers.service';
import { Lecturer } from './entities/lecturer.entity';
import { CreateLecturerInput } from './dto/create-lecturer.input';
import { UpdateLecturerInput } from './dto/update-lecturer.input';

@Resolver(() => Lecturer)
export class LecturersResolver {
  constructor(private readonly lecturersService: LecturersService) {}
}
