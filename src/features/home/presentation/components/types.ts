import { Experience } from '../../domain/entities/Experience';
import { Skill } from '../../domain/entities/Skill';

export interface ExperienceListProps {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
}

export interface SkillsListProps {
  skills: Skill[];
  isLoading: boolean;
  error: string | null;
} 