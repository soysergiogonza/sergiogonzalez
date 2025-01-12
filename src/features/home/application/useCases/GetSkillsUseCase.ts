import { Skill } from "../../domain/entities/Skill";
import { ISkillRepository } from "../../domain/repositories/ISkillRepository";

export class GetSkillsUseCase {
  constructor(private skillRepository: ISkillRepository) {}

  async execute(): Promise<Skill[]> {
    return await this.skillRepository.getAllSkills();
  }

  async executeByCategory(category: string): Promise<Skill[]> {
    return await this.skillRepository.getSkillsByCategory(category);
  }

  async executeTopSkills(limit: number): Promise<Skill[]> {
    return await this.skillRepository.getTopSkills(limit);
  }
} 