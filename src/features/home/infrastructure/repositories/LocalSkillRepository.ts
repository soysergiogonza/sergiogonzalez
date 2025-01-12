import { Skill } from "../../domain/entities/Skill";
import { ISkillRepository } from "../../domain/repositories/ISkillRepository";
import { TECH_STACK } from "../../domain/constants/skills";

export class LocalSkillRepository implements ISkillRepository {
  async getAllSkills(): Promise<Skill[]> {
    return TECH_STACK.map(tech => new Skill(
      tech.id,
      tech.icon.name,
      tech.icon,
      tech.category,
      this.getLevelValue(tech.level),
      tech.color
    ));
  }

  private getLevelValue(level: string): number {
    const levelValues = {
      'Básico': 40,
      'Intermedio': 70,
      'Avanzado': 90
    };
    return levelValues[level] || 50;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return (await this.getAllSkills())
      .filter(skill => skill.category === category);
  }

  async getTopSkills(limit: number): Promise<Skill[]> {
    return (await this.getAllSkills())
      .filter(skill => skill.isAdvanced())
      .slice(0, limit);
  }
} 