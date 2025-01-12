import { Project } from '../entities/Project';

export interface IProjectRepository {
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByTechnology(tech: string): Promise<Project[]>;
} 