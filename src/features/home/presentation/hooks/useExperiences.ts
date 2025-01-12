import { useState, useCallback, useEffect, useMemo } from 'react';
import { Experience } from '../../domain/entities/Experience';
import { LocalExperienceRepository } from '../../infrastructure/repositories/LocalExperienceRepository';
import { GetExperiencesUseCase } from '../../application/useCases/GetExperiencesUseCase';

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new LocalExperienceRepository();
  const getExperiencesUseCase = new GetExperiencesUseCase(repository);

  const sortedExperiences = useMemo(() => 
    experiences.sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    ),
    [experiences]
  );

  const fetchExperiences = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getExperiencesUseCase.execute();
      setExperiences(data);
      const current = data.find(exp => exp.isCurrentJob());
      setCurrentExperience(current || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return {
    experiences: sortedExperiences,
    currentExperience,
    isLoading,
    error,
    refetch: fetchExperiences
  };
}; 