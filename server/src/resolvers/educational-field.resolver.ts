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
  CreateEducationalFieldInput,
  EducationalFieldMutationResponse,
  MutationResponse,
  UpdateEducationalFieldInput,
} from "./types";
import { EducationalField, EducationalSystem, Faculty } from "../entities";

@Resolver(EducationalField)
export class EducationalFieldsResolver {
  private readonly educationalFieldRepository: Repository<EducationalField>;
  private readonly educationalSystemRepository: Repository<EducationalSystem>;
  private readonly facultyRepository: Repository<Faculty>;

  constructor() {
    this.educationalFieldRepository =
      dataSource.getRepository(EducationalField);
    this.educationalSystemRepository =
      dataSource.getRepository(EducationalSystem);
    this.facultyRepository = dataSource.getRepository(Faculty);
  }

  @FieldResolver(() => EducationalSystem)
  async educationalSystem(@Root() root: EducationalField) {
    return await this.educationalSystemRepository.findOneBy({
      id: root.educationalSystemId,
    });
  }

  @FieldResolver(() => Faculty)
  async faculty(@Root() root: EducationalField) {
    return await this.facultyRepository.findOneBy({
      id: root.facultyId,
    });
  }

  @Query(() => EducationalField, { nullable: true })
  async educationalField(@Arg("id") id: string): Promise<EducationalField> {
    return await this.educationalFieldRepository.findOneBy({ id });
  }

  @Query(() => [EducationalField])
  async educationalFields(): Promise<EducationalField[]> {
    return await this.educationalFieldRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalFieldMutationResponse)
  async createEducationalField(
    @Arg("createEducationalFieldInput")
    { id, name, facultyId, educationalSystemId }: CreateEducationalFieldInput
  ): Promise<EducationalFieldMutationResponse> {
    try {
      if (await this.educationalFieldRepository.exist({ where: { id } })) {
        return {
          success: false,
          errors: [{ field: "id", message: "Ngành đào tạo đã tồn tại" }],
        };
      }

      const educationalField = this.educationalFieldRepository.create({
        id,
        name,
        facultyId,
        educationalSystemId,
      });

      await dataSource.manager.save(educationalField);

      return {
        success: true,
        message: "Ngành đào tạo được tạo thành công",
        educationalField,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalFieldMutationResponse)
  async updateEducationalField(
    @Arg("updateEducationalFieldInput")
    { id, ...input }: UpdateEducationalFieldInput
  ): Promise<EducationalFieldMutationResponse> {
    try {
      const educationalField = await this.educationalFieldRepository.findOneBy({
        id,
      });
      if (!educationalField) throw new Error("Ngành đào tạo không tồn tại");

      Object.assign(educationalField, input);

      await dataSource.manager.save(educationalField);

      return {
        success: true,
        message: "Ngành đào tạo được cập nhật thành công",
        educationalField,
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
  async removeEducationalField(
    @Arg("id") id: string
  ): Promise<MutationResponse> {
    try {
      const educationalField = await this.educationalFieldRepository.findOneBy({
        id,
      });
      if (!educationalField) throw new Error("Ngành đào tạo không tồn tại");

      await dataSource.manager.remove(educationalField);

      return {
        success: true,
        message: "Ngành đào tạo được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
