import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { dataSource } from "../data-source";
import { Role } from "../entities/types";
import {
  CreateEducationalSystemInput,
  EducationalSystemMutationResponse,
  MutationResponse,
  UpdateEducationalSystemInput,
} from "./types";
import { EducationalSystem } from "../entities";

@Resolver(EducationalSystem)
export class EducationalSystemsResolver {
  private readonly educationalSystemRepository: Repository<EducationalSystem>;

  constructor() {
    this.educationalSystemRepository =
      dataSource.getRepository(EducationalSystem);
  }

  @Query(() => EducationalSystem, { nullable: true })
  async educationalSystem(
    @Arg("id", () => Int) id: number
  ): Promise<EducationalSystem> {
    return await this.educationalSystemRepository.findOneBy({ id });
  }

  @Query(() => [EducationalSystem])
  async educationalSystems(): Promise<EducationalSystem[]> {
    return await this.educationalSystemRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalSystemMutationResponse)
  async createEducationalSystem(
    @Arg("createEducationalSystemInput")
    { name, type }: CreateEducationalSystemInput
  ): Promise<EducationalSystemMutationResponse> {
    try {
      if (
        await this.educationalSystemRepository.exist({ where: { name, type } })
      ) {
        return {
          success: false,
          errors: [{ field: "root", message: "Hệ đào tạo đã tồn tại" }],
        };
      }

      const educationalSystem = this.educationalSystemRepository.create({
        name,
        type,
      });

      await dataSource.manager.save(educationalSystem);

      return {
        success: true,
        message: "Hệ đào tạo được tạo thành công",
        educationalSystem,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => EducationalSystemMutationResponse)
  async updateEducationalSystem(
    @Arg("updateEducationalSystemInput")
    { id, ...input }: UpdateEducationalSystemInput
  ): Promise<EducationalSystemMutationResponse> {
    try {
      const educationalSystem =
        await this.educationalSystemRepository.findOneBy({ id });
      if (!educationalSystem) throw new Error("Hệ đào tạo không tồn tại");

      if (
        (educationalSystem.name !== input.name ||
          educationalSystem.type !== input.type) &&
        (await this.educationalSystemRepository.exist({
          where: { name: input.name, type: input.type },
        }))
      ) {
        return {
          success: false,
          errors: [{ field: "root", message: "Hệ đào tạo đã tồn tại" }],
        };
      }

      Object.assign(educationalSystem, input);

      await dataSource.manager.save(educationalSystem);

      return {
        success: true,
        message: "Hệ đào tạo được cập nhật thành công",
        educationalSystem,
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
  async removeEducationalSystem(
    @Arg("id", () => Int) id: number
  ): Promise<MutationResponse> {
    try {
      const educationalSystem =
        await this.educationalSystemRepository.findOneBy({ id });
      if (!educationalSystem) throw new Error("Hệ đào tạo không tồn tại");

      await dataSource.manager.remove(educationalSystem);

      return {
        success: true,
        message: "Hệ đào tạo được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
