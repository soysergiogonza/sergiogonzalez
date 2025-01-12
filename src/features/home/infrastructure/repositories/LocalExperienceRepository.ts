import { Experience } from "../../domain/entities/Experience";
import { IExperienceRepository } from "../../domain/repositories/IExperienceRepository";
import { WORK_EXPERIENCES } from "../../domain/constants/experiences";

export class LocalExperienceRepository implements IExperienceRepository {
  async getAllExperiences(): Promise<Experience[]> {
    return WORK_EXPERIENCES.map(exp => new Experience(
      exp.id,
      exp.title,
      exp.company,
      exp.type,
      exp.location,
      exp.link,
      exp.startDate,
      exp.endDate,
      exp.duration,
      exp.logo,
      exp.description,
      exp.skills
    ));
  }

  async getCurrentExperience(): Promise<Experience> {
    const currentExp = WORK_EXPERIENCES.find(exp => !exp.endDate);
    if (!currentExp) throw new Error("No current experience found");
    
    return new Experience(
      currentExp.id,
      currentExp.title,
      currentExp.company,
      currentExp.type,
      currentExp.location,
      currentExp.link,
      currentExp.startDate,
      currentExp.endDate,
      currentExp.duration,
      currentExp.logo,
      currentExp.description,
      currentExp.skills
    );
  }

  async getExperiencesByYear(year: number): Promise<Experience[]> {
    return (await this.getAllExperiences())
      .filter(exp => new Date(exp.startDate).getFullYear() === year);
  }
} 