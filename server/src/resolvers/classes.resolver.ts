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
import { Class, Course, Faculty, Lecturer } from "../entities";
import { Role } from "../entities/types";
import {
  CreateClassInput,
  ClassMutationResponse,
  MutationResponse,
  UpdateClassInput,
  FieldError,
} from "./types";

@Resolver(Class)
export class ClassesResolver {
  private readonly classRepository: Repository<Class>;
  private readonly facultyRepository: Repository<Faculty>;
  private readonly courseRepository: Repository<Course>;
  private readonly lecturerRepository: Repository<Lecturer>;

  constructor() {
    this.classRepository = dataSource.getRepository(Class);
    this.facultyRepository = dataSource.getRepository(Faculty);
    this.courseRepository = dataSource.getRepository(Course);
    this.lecturerRepository = dataSource.getRepository(Lecturer);
  }

  @FieldResolver(() => Faculty)
  async faculty(@Root() root: Class) {
    return await this.facultyRepository.findOneBy({
      id: root.facultyId,
    });
  }

  @FieldResolver(() => Course)
  async course(@Root() root: Class) {
    return await this.courseRepository.findOneBy({
      id: root.courseId,
    });
  }

  @FieldResolver(() => Lecturer)
  async academicAdvisor(@Root() root: Class) {
    return await this.lecturerRepository.findOneBy({
      id: root.academicAdvisorId,
    });
  }

  @Query(() => Class, { nullable: true })
  async class(@Arg("id", () => Int) id: number): Promise<Class> {
    return await this.classRepository.findOneBy({ id });
  }

  @Query(() => [Class])
  async classes(): Promise<Class[]> {
    return await this.classRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => ClassMutationResponse)
  async createClass(
    @Arg("createClassInput")
    { name, facultyId, courseId, academicAdvisorId }: CreateClassInput
  ): Promise<ClassMutationResponse> {
    try {
      let errors: FieldError[] = [];

      if (await this.classRepository.exist({ where: { name } })) {
        errors.push({ field: "name", message: "Tên đã tồn tại" });
      }

      const faculty = await this.facultyRepository.findOneBy({ id: facultyId });
      if (!faculty)
        errors.push({ field: "facultyId", message: "Khoa không tồn tại" });

      if (errors.length)
        return {
          success: false,
          errors,
        };

      const _class = this.classRepository.create({
        name,
        faculty,
        courseId,
        academicAdvisorId,
      });

      await dataSource.manager.save(_class);

      return {
        success: true,
        message: "Lớp được tạo thành công",
        class: _class,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => ClassMutationResponse)
  async updateClass(
    @Arg("updateClassInput")
    { id, ...input }: UpdateClassInput
  ): Promise<ClassMutationResponse> {
    try {
      const _class = await this.classRepository.findOneBy({ id });
      if (!_class) throw new Error("Lớp không tồn tại");

      if (
        _class.name !== input.name &&
        (await this.classRepository.exist({ where: { name: input.name } }))
      ) {
        return {
          success: false,
          errors: [{ field: "name", message: "Tên đã tồn tại" }],
        };
      }

      Object.assign(_class, input);

      await dataSource.manager.save(_class);

      return {
        success: true,
        message: "Lớp được cập nhật thành công",
        class: _class,
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
  async removeClass(
    @Arg("id", () => Int) id: number
  ): Promise<MutationResponse> {
    try {
      const _class = await this.classRepository.findOneBy({ id });
      if (!_class) throw new Error("Lớp không tồn tại");

      await dataSource.manager.remove(_class);

      return {
        success: true,
        message: "Lớp được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
