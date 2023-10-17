import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'lecturers' })
export class Lecturer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 20 })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 10 })
  dob?: string;

  @Field()
  @Column({ length: 50 })
  pob?: string;
}
