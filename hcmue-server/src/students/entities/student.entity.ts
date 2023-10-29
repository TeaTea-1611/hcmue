import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { StudentEnumType, StudyStatusEnumType } from '../types/student';
import { Faculty } from '../../faculties/entities/faculty.entity';
import { Course } from '../../courses/entities/course.entity';
import { Class } from '../../classes/entities/class.entity';

@ObjectType()
@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @Field()
  @PrimaryColumn({ length: 20 })
  id: string;

  @Field()
  @Column({ nullable: true })
  userId?: number;

  @Field(() => User)
  @OneToOne(() => User, { nullable: true })
  user?: User;

  @Field()
  @Column({ length: 100 })
  name: string; // Họ và tên

  @Field(() => Faculty)
  @ManyToOne(() => Faculty)
  faculty: Faculty;

  @Field(() => Course)
  @ManyToOne(() => Course)
  course: Course;

  @Field(() => Class)
  @ManyToOne(() => Class)
  class: Class;

  @Field({ nullable: true })
  @Column({ length: 10, nullable: true })
  dob?: string; // Ngày sinh

  @Field({ nullable: true })
  @Column({ length: 50, nullable: true })
  pob?: string; // Nơi sinh

  @Field()
  @Column({ enum: [0, 1, 2] })
  gender: number;

  @Field()
  @Column({ length: 20, nullable: true })
  ethnicity?: string; // Dân tộc

  @Field()
  @Column({ length: 15, nullable: true })
  identification?: string; // CCCD / CMND

  @Field()
  @Column({ length: 20, nullable: true })
  religion?: string; // Tôn giáo

  @Field()
  @Column({ length: 10, nullable: true })
  area?: string; // Khu vực

  @Field()
  @Column({ default: false })
  priority: boolean; // Diện ưu tiên

  @Field()
  @Column({ default: false })
  union: boolean; // Đoàn/đảng

  @Field()
  @Column({ enum: StudentEnumType, default: StudentEnumType.Official })
  studentType: StudentEnumType; // Loại sinh viên

  @Field()
  @Column({ enum: StudyStatusEnumType, default: StudyStatusEnumType.Active })
  studyStatus: StudyStatusEnumType; // Tình trạng học

  @Field()
  @Column({ length: 50, nullable: true })
  province?: string; // Tỉnh/Thành phố

  @Field()
  @Column({ length: 50, nullable: true })
  district?: string; // Quận/huyện

  @Field()
  @Column({ length: 50, nullable: true })
  country?: string; // Quốc gia

  @Field()
  @Column({ length: 100, nullable: true })
  permanentAddress?: string; // Địa chỉ thường trú

  @Field()
  @Column({ length: 15, nullable: true })
  numberPhone?: string; // Điện thoại

  @Field()
  @Column({ length: 50, nullable: true })
  email?: string; //Email

  @Field()
  @Column({ length: 100, nullable: true })
  address?: string; //Địa chỉ

  @Field()
  @Column({ length: 100, nullable: true })
  fatherName?: string; //Họ tên cha

  @Field()
  @Column({ length: 100, nullable: true })
  motherName?: string; //Họ tên mẹ

  @Field()
  @Column({ length: 100, nullable: true })
  relativeName?: string; //Họ tên người thân

  @Field()
  @Column({ length: 15, nullable: true })
  relativeNumberPhone?: string; //Điện thoại người thân

  @Field()
  @Column({ length: 100, nullable: true })
  relativeAddress?: string; //Địa chỉ người thân

  @Field()
  @Column({ nullable: true })
  note?: string; //Ghi chú

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
