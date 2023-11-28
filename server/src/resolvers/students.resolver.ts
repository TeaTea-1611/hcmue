import {
  Arg,
  Authorized,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ILike, In, Like, type Repository } from "typeorm";
import { dataSource } from "../data-source";
import {
  Class,
  Course,
  EducationalField,
  EducationalProgram,
  Faculty,
  Student,
  User,
} from "../entities";
import { Role } from "../entities/types";
import {
  CreateStudentAndAccountInput,
  FieldError,
  StudentMutationResponse,
  MutationResponse,
  UpdateStudentInput,
  StudentPaginatedResponse,
} from "./types";
import * as argon2 from "argon2";

@Resolver(Student)
export class StudentsResolver {
  private readonly studentRepository: Repository<Student>;
  private readonly userRepository: Repository<User>;
  private readonly educationalProgramRepository: Repository<EducationalProgram>;
  private readonly facultyRepository: Repository<Faculty>;
  private readonly classRepository: Repository<Class>;
  private readonly educationalFieldRepository: Repository<EducationalField>;
  private readonly courseRepository: Repository<Course>;

  constructor() {
    this.studentRepository = dataSource.getRepository(Student);
    this.userRepository = dataSource.getRepository(User);
    this.facultyRepository = dataSource.getRepository(Faculty);
    this.courseRepository = dataSource.getRepository(Course);
    this.educationalProgramRepository =
      dataSource.getRepository(EducationalProgram);
    this.educationalFieldRepository =
      dataSource.getRepository(EducationalField);
    this.classRepository = dataSource.getRepository(Class);
  }

  @FieldResolver(() => Faculty)
  async faculty(@Root() root: Student) {
    return await this.facultyRepository.findOneBy({ id: root.facultyId });
  }

  @FieldResolver(() => Class)
  async class(@Root() root: Student) {
    return await this.classRepository.findOneBy({ id: root.classId });
  }

  @FieldResolver(() => Class)
  async educationalField(@Root() root: Student) {
    return await this.educationalFieldRepository.findOneBy({
      id: root.educationalFieldId,
    });
  }

  @FieldResolver(() => Course)
  async course(@Root() root: Student) {
    return await this.courseRepository.findOneBy({
      id: root.courseId,
    });
  }

  @FieldResolver(() => User)
  async user(@Root() root: Student) {
    return await this.userRepository.findOneBy({ id: root.userId });
  }

  @Query(() => Student, { nullable: true })
  async student(@Arg("id") id: string): Promise<Student> {
    return await this.studentRepository.findOneBy({ id });
  }

  @Query(() => StudentPaginatedResponse)
  async students(
    @Arg("pageIndex", () => Int, { nullable: true }) pageIndex: number = 0,
    @Arg("take", () => Int, { nullable: true }) take: number = 10,
    @Arg("id", { nullable: true }) id: string = ""
  ): Promise<StudentPaginatedResponse> {
    const totalCount = await this.studentRepository.count({
      where: { id: ILike(`%${id}%`) },
    });

    const students = await this.studentRepository.find({
      where: { id: ILike(`%${id}%`) },
      take,
      skip: pageIndex * take,
    });

    return {
      students,
      totalCount,
    };
  }

  @Authorized([Role.Admin])
  @Mutation(() => StudentMutationResponse)
  async createStudent(
    @Arg("createStudentInput")
    {
      username,
      password,
      educationalProgramIds,
      ...input
    }: CreateStudentAndAccountInput
  ): Promise<StudentMutationResponse> {
    try {
      let errors: FieldError[] = [];

      if (await this.studentRepository.exist({ where: { id: input.id } }))
        errors.push({ field: "id", message: "Mã sinh viên đã tồn tại" });

      if (await this.userRepository.exist({ where: { username } }))
        errors.push({ field: "username", message: "Tài khoản đã tồn tại" });

      if (errors.length) {
        return {
          success: false,
          errors,
        };
      }

      const educationalPrograms =
        await this.educationalProgramRepository.findBy({
          id: In(educationalProgramIds),
        });

      const hashPassword = await argon2.hash(password);

      const user = this.userRepository.create({
        username,
        password: hashPassword,
        role: Role.Student,
      });

      await dataSource.manager.save(user);

      const student = this.studentRepository.create({
        ...input,
        user,
        educationalPrograms,
      });

      await dataSource.manager.save(student);

      return {
        success: true,
        message: "Sinh viên được tạo thành công",
        student,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => StudentMutationResponse)
  async updateStudent(
    @Arg("updateStudentInput")
    { id, educationalProgramIds, ...input }: UpdateStudentInput
  ): Promise<StudentMutationResponse> {
    try {
      const student = await this.studentRepository.findOneBy({ id });
      if (!student) throw new Error("Sinh viên không tồn tại");

      Object.assign(student, input);

      await dataSource.manager.save(student);

      return {
        success: true,
        message: "Sinh viên được cập nhật thành công",
        student,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => MutationResponse)
  async removeStudent(@Arg("id") id: string): Promise<MutationResponse> {
    try {
      const student = await this.studentRepository.findOneBy({ id });
      if (!student) throw new Error("Sinh viên không tồn tại");

      await dataSource.manager.remove(student);

      return {
        success: true,
        message: "Sinh viên được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
