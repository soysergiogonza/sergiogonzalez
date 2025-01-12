import { Experience } from '../entities/Experience';

export interface IExperienceRepository {
  getAllExperiences(): Promise<Experience[]>;
  getCurrentExperience(): Promise<Experience>;
  getExperiencesByYear(year: number): Promise<Experience[]>;
} 