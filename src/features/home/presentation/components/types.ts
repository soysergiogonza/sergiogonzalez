import { Experience } from '../../domain/entities/Experience';

export interface ExperienceListProps {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
}

export interface SkillsListProps {
  isLoading: boolean;
  error: string | null;
} 