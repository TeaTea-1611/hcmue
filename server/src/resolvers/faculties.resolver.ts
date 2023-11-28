import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { type Repository } from "typeorm";
import { dataSource } from "../data-source";
import { Faculty } from "../entities";
import { Role } from "../entities/types";
import {
  CreateFacultyInput,
  FacultyMutationResponse,
  MutationResponse,
  UpdateFacultyInput,
} from "./types";

@Resolver(Faculty)
export class FacultiesResolver {
  private readonly facultyRepository: Repository<Faculty>;

  constructor() {
    this.facultyRepository = dataSource.getRepository(Faculty);
  }

  @Query(() => Faculty, { nullable: true })
  async faculty(@Arg("id", () => Int) id: number): Promise<Faculty> {
    return await this.facultyRepository.findOneBy({ id });
  }

  @Query(() => [Faculty])
  async faculties(): Promise<Faculty[]> {
    return await this.facultyRepository.find();
  }

  @Authorized([Role.Admin])
  @Mutation(() => FacultyMutationResponse)
  async createFaculty(
    @Arg("createFacultyInput")
    { name, address, email, numberPhone }: CreateFacultyInput
  ): Promise<FacultyMutationResponse> {
    try {
      if (await this.facultyRepository.exist({ where: { name } })) {
        return {
          success: false,
          errors: [{ field: "name", message: "Tên đã tồn tại" }],
        };
      }

      const faculty = this.facultyRepository.create({
        name,
        address,
        email,
        numberPhone,
      });

      await dataSource.manager.save(faculty);

      return {
        success: true,
        message: "Khoa được tạo thành công",
        faculty,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Authorized([Role.Admin])
  @Mutation(() => FacultyMutationResponse)
  async updateFaculty(
    @Arg("updateFacultyInput")
    { id, ...input }: UpdateFacultyInput
  ): Promise<FacultyMutationResponse> {
    try {
      const faculty = await this.facultyRepository.findOneBy({ id });
      if (!faculty) throw new Error("Khoa không tồn tại");

      if (
        faculty.name !== input.name &&
        (await this.facultyRepository.exist({ where: { name: input.name } }))
      ) {
        return {
          success: false,
          errors: [{ field: "name", message: "Tên đã tồn tại" }],
        };
      }

      Object.assign(faculty, input);

      await dataSource.manager.save(faculty);

      return {
        success: true,
        message: "Khoa được cập nhật thành công",
        faculty,
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
  async removeFaculty(
    @Arg("id", () => Int) id: number
  ): Promise<MutationResponse> {
    try {
      const faculty = await this.facultyRepository.findOneBy({ id });
      if (!faculty) throw new Error("Khoa không tồn tại");

      await dataSource.manager.remove(faculty);

      return {
        success: true,
        message: "Khoa được xóa thành công",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
