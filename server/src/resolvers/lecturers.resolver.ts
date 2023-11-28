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
import { type Repository } from "typeorm";
import { dataSource } from "../data-source";
import { Faculty, Lecturer, User } from "../entities";
import { Role } from "../entities/types";
import {
  CreateLecturerAndAccountInput,
  FieldError,
  LecturerMutationResponse,
  MutationResponse,
  UpdateLecturerInput,
} from "./types";
import * as argon2 from "argon2";

@Resolver(Lecturer)
export class LecturersResolver {
  private readonly lecturerRepository: Repository<Lecturer>;
  private readonly userRepository: Repository<User>;
  private readonly facultyRepository: Repository<Faculty>;

  constructor() {
    this.lecturerRepository = dataSource.getRepository(Lecturer);
    this.userRepository = dataSource.getRepository(User);
    this.facultyRepository = dataSource.getRepository(Faculty);
  }

  @FieldResolver(() => Faculty)
  async faculty(@Root() root: Lecturer) {
    return await this.facultyRepository.findOneBy({ id: root.facultyId });
  }

  @FieldResolver(() => User)
  async user(@Root() root: Lecturer) {
    return await this.userRepository.findOneBy({ id: root.userId });
  }

  @Query(() => Lecturer, { nullable: true })
  async lecturer(@Arg("id") id: string): Promise<Lecturer> {
    return await this.lecturerRepository.findOneBy({ id });
  }

  @Query(() => [Lecturer])
  async lecturers(): Promise<Lecturer[]> {
    return await this.lecturerRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => LecturerMutationResponse)
  async createLecturer(
    @Arg("createLecturerInput")
    { username, password, ...input }: CreateLecturerAndAccountInput
  ): Promise<LecturerMutationResponse> {
    try {
      let errors: FieldError[] = [];

      if (await this.lecturerRepository.exist({ where: { id: input.id } }))
        errors.push({ field: "id", message: "Mã giảng viên đã tồn tại" });

      if (await this.userRepository.exist({ where: { username } }))
        errors.push({ field: "username", message: "Tài khoản đã tồn tại" });

      if (errors.length) {
        return {
          success: false,
          errors,
        };
      }

      const hashPassword = await argon2.hash(password);
      const user = this.userRepository.create({
        username,
        password: hashPassword,
        role: Role.Lecturer,
      });

      await dataSource.manager.save(user);

      const lecturer = this.lecturerRepository.create({
        ...input,
        user,
      });

      await dataSource.manager.save(lecturer);

      return {
        success: true,
        message: "Giảng viên được tạo thành công",
        lecturer,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => LecturerMutationResponse)
  async updateLecturer(
    @Arg("updateLecturerInput")
    { id, ...input }: UpdateLecturerInput
  ): Promise<LecturerMutationResponse> {
    try {
      const lecturer = await this.lecturerRepository.findOneBy({ id });
      if (!lecturer) throw new Error("Giảng viên không tồn tại");

      Object.assign(lecturer, input);

      await dataSource.manager.save(lecturer);

      return {
        success: true,
        message: "Giảng viên được cập nhật thành công",
        lecturer,
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
  async removeLecturer(@Arg("id") id: string): Promise<MutationResponse> {
    try {
      const lecturer = await this.lecturerRepository.findOneBy({ id });
      if (!lecturer) throw new Error("Giảng viên không tồn tại");

      await dataSource.manager.remove(lecturer);

      return {
        success: true,
        message: "Giảng viên được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
