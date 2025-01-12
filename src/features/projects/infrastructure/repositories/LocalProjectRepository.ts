import { Project } from '../../domain/entities/Project';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository';
import { PROJECTS } from '../../domain/constants/projects';

export class LocalProjectRepository implements IProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    return PROJECTS.map(project => new Project(
      project.id,
      project.title,
      project.description,
      project.image,
      project.technologies,
      project.demo,
      project.github,
      project.featured,
      project.status
    ));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter(project => project.featured);
  }

  async getProjectsByTechnology(tech: string): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter(project => 
      project.technologies.includes(tech)
    );
  }
} 