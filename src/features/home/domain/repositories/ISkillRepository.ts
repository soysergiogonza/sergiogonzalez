import { Skill } from '../entities/Skill';

export interface ISkillRepository {
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getTopSkills(limit: number): Promise<Skill[]>;
} 