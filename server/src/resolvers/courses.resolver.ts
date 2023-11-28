import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { dataSource } from "../data-source";
import { Course } from "../entities";
import { Role } from "../entities/types";
import {
  CreateCourseInput,
  CourseMutationResponse,
  MutationResponse,
  UpdateCourseInput,
} from "./types";

@Resolver(Course)
export class CoursesResolver {
  private readonly courseRepository: Repository<Course>;

  constructor() {
    this.courseRepository = dataSource.getRepository(Course);
  }

  @Query(() => Course, { nullable: true })
  async course(@Arg("id", () => Int) id: number): Promise<Course> {
    return await this.courseRepository.findOneBy({ id });
  }

  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => CourseMutationResponse)
  async createCourse(
    @Arg("createCourseInput")
    { name }: CreateCourseInput
  ): Promise<CourseMutationResponse> {
    try {
      if (await this.courseRepository.exist({ where: { name } })) {
        return {
          success: false,
          errors: [{ field: "name", message: "Khóa học đã tồn tại" }],
        };
      }

      const course = this.courseRepository.create({
        name,
      });

      await dataSource.manager.save(course);

      return {
        success: true,
        message: "Khóa học được tạo thành công",
        course,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => CourseMutationResponse)
  async updateCourse(
    @Arg("updateCourseInput")
    { id, ...input }: UpdateCourseInput
  ): Promise<CourseMutationResponse> {
    try {
      const course = await this.courseRepository.findOneBy({ id });
      if (!course) throw new Error("Khóa học không tồn tại");

      if (
        course.name !== input.name &&
        (await this.courseRepository.exist({ where: { name: input.name } }))
      ) {
        return {
          success: false,
          errors: [{ field: "name", message: "Khóa học đã tồn tại" }],
        };
      }

      Object.assign(course, input);

      await dataSource.manager.save(course);

      return {
        success: true,
        message: "Khóa học được cập nhật thành công",
        course,
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
  async removeCourse(
    @Arg("id", () => Int) id: number
  ): Promise<MutationResponse> {
    try {
      const course = await this.courseRepository.findOneBy({ id });
      if (!course) throw new Error("Khóa học không tồn tại");

      await dataSource.manager.remove(course);

      return {
        success: true,
        message: "Khóa học được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
