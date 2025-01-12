import { useState, useCallback, useEffect, useMemo } from 'react';
import { Project } from '../../domain/entities/Project';
import { LocalProjectRepository } from '../../infrastructure/repositories/LocalProjectRepository';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new LocalProjectRepository();

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await repository.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const technologies = useMemo(() => {
    const techs = projects.flatMap(project => project.technologies);
    return Array.from(new Set(techs)).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter(project => 
      project.technologies.includes(selectedTech)
    );
  }, [projects, selectedTech]);

  return {
    projects: filteredProjects,
    technologies,
    selectedTech,
    setSelectedTech,
    isLoading,
    error,
    refetch: fetchProjects
  };
}; 