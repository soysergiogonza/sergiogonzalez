import { useSkills } from '../hooks/useSkills';
import { SkillsList } from '../components/SkillsList';
import { HomeErrorBoundary } from '../components/ErrorBoundary';
import { SkillsLoading } from '../components/LoadingStates';
import { Krypton } from '@/utils/utils';

export const Skills = () => {
  const {isLoading, error } = useSkills();

  return (
    <HomeErrorBoundary>
      <article className='relative flex flex-col gap-8'>
        <h2 className={`text-3xl font-bold text-primary ${Krypton.className}`}>
          Habilidades
        </h2>
        {isLoading ? (
          <SkillsLoading />
        ) : (
          <SkillsList 
            isLoading={isLoading}
            error={error}
          />
        )}
      </article>
    </HomeErrorBoundary>
  );
}; 