import { Injectable } from '@nestjs/common';
import { CreateLecturerInput } from './dto/create-lecturer.input';
import { UpdateLecturerInput } from './dto/update-lecturer.input';

@Injectable()
export class LecturersService {
  create(createLecturerInput: CreateLecturerInput) {
    return 'This action adds a new lecturer';
  }

  findAll() {
    return `This action returns all lecturers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lecturer`;
  }

  update(id: number, updateLecturerInput: UpdateLecturerInput) {
    return `This action updates a #${id} lecturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} lecturer`;
  }
}
