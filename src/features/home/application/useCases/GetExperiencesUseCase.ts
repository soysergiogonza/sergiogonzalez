import { Experience } from "../../domain/entities/Experience";
import { IExperienceRepository } from "../../domain/repositories/IExperienceRepository";

export class GetExperiencesUseCase {
  constructor(private experienceRepository: IExperienceRepository) {}

  async execute(): Promise<Experience[]> {
    return await this.experienceRepository.getAllExperiences();
  }
} 