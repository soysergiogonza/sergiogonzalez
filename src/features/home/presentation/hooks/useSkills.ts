import { useState, useCallback, useEffect } from 'react';
import { Skill } from '../../domain/entities/Skill';
import { LocalSkillRepository } from '../../infrastructure/repositories/LocalSkillRepository';
import { GetSkillsUseCase } from '../../application/useCases/GetSkillsUseCase';

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = new LocalSkillRepository();
  const getSkillsUseCase = new GetSkillsUseCase(repository);

  const fetchSkills = useCallback(async () => {
    try {
      setIsLoading(true);
      const allSkills = await getSkillsUseCase.execute();
      setSkills(allSkills);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return {
    skills,
    isLoading,
    error,
    refetch: fetchSkills
  };
}; 