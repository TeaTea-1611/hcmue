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
import { Role } from "../entities/types";
import {
  CreateEducationalProgramInput,
  EducationalProgramMutationResponse,
  MutationResponse,
  UpdateEducationalProgramInput,
} from "./types";
import { Course, EducationalField, EducationalProgram } from "../entities";

@Resolver(EducationalProgram)
export class EducationalProgramsResolver {
  private readonly educationalProgramRepository: Repository<EducationalProgram>;
  private readonly educationalFieldRepository: Repository<EducationalField>;
  private readonly courseRepository: Repository<Course>;

  constructor() {
    this.educationalProgramRepository =
      dataSource.getRepository(EducationalProgram);
    this.educationalFieldRepository =
      dataSource.getRepository(EducationalField);
    this.courseRepository = dataSource.getRepository(Course);
  }

  @FieldResolver(() => EducationalField)
  async educationalField(@Root() root: EducationalProgram) {
    return await this.educationalFieldRepository.findOneBy({
      id: root.educationalFieldId,
    });
  }

  @FieldResolver(() => Course)
  async course(@Root() root: EducationalProgram) {
    return await this.courseRepository.findOneBy({
      id: root.courseId,
    });
  }

  @Query(() => EducationalProgram, { nullable: true })
  async educationalProgram(@Arg("id") id: string): Promise<EducationalProgram> {
    return await this.educationalProgramRepository.findOneBy({ id });
  }

  @Query(() => [EducationalProgram])
  async educationalPrograms(): Promise<EducationalProgram[]> {
    return await this.educationalProgramRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalProgramMutationResponse)
  async createEducationalProgram(
    @Arg("createEducationalProgramInput")
    { id, name, courseId, educationalFieldId }: CreateEducationalProgramInput
  ): Promise<EducationalProgramMutationResponse> {
    try {
      if (await this.educationalProgramRepository.exist({ where: { id } })) {
        return {
          success: false,
          errors: [{ field: "id", message: "Chương trình đào tạo đã tồn tại" }],
        };
      }

      const educationalProgram = this.educationalProgramRepository.create({
        id,
        name,
        courseId,
        educationalFieldId,
      });

      await dataSource.manager.save(educationalProgram);

      return {
        success: true,
        message: "Chương trình đào tạo được tạo thành công",
        educationalProgram,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalProgramMutationResponse)
  async updateEducationalProgram(
    @Arg("updateEducationalProgramInput")
    { id, ...input }: UpdateEducationalProgramInput
  ): Promise<EducationalProgramMutationResponse> {
    try {
      const educationalProgram =
        await this.educationalProgramRepository.findOneBy({ id });
      if (!educationalProgram)
        throw new Error("Chương trình đào tạo không tồn tại");

      Object.assign(educationalProgram, input);

      await dataSource.manager.save(educationalProgram);

      return {
        success: true,
        message: "Chương trình đào tạo được cập nhật thành công",
        educationalProgram,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // @Authorized([Role.Admin])
  // @Mutation(() => MutationResponse)
  // async removeEducationalProgram(
  //   @Arg("id") id: string
  // ): Promise<MutationResponse> {
  //   try {
  //     const educationalProgram =
  //       await this.educationalProgramRepository.findOneBy({ id });
  //     if (!educationalProgram)
  //       throw new Error("Chương trình đào tạo không tồn tại");

  //     await dataSource.manager.remove(educationalProgram);

  //     return {
  //       success: true,
  //       message: "Chương trình đào tạo được xóa thành công",
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error.message,
  //     };
  //   }
  // }
}
