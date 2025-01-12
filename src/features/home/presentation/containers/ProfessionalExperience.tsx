import { useExperiences } from '../hooks/useExperiences';
import { ExperienceList } from '../components/ExperienceList';
import { HomeErrorBoundary } from '../components/ErrorBoundary';
import { ExperienceLoading } from '../components/LoadingStates';
import { Krypton } from '@/utils/utils';

export const ProfessionalExperience = () => {
  const { experiences, isLoading, error } = useExperiences();

  return (
    <HomeErrorBoundary>
      <section className='relative flex flex-col gap-8'>
        <h2 className={`text-3xl font-bold text-primary ${Krypton.className}`}>
          Experiencia Profesional
        </h2>
        {isLoading ? (
          <ExperienceLoading />
        ) : (
          <ExperienceList 
            experiences={experiences}
            isLoading={isLoading}
            error={error}
          />
        )}
      </section>
    </HomeErrorBoundary>
  );
}; 