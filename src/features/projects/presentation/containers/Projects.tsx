import { useProjects } from '../hooks/useProjects';
import { ProjectList } from '../components/ProjectList';
import { ProjectFilter } from '../components/ProjectFilter';
import { ProjectsLoading } from '../components/LoadingStates';
import { HomeErrorBoundary } from '@/features/home/presentation/components/ErrorBoundary';
import { Krypton } from '@/utils/utils';

export const Projects = () => {
  const { 
    projects, 
    technologies, 
    selectedTech, 
    setSelectedTech,
    isLoading,
    error 
  } = useProjects();

  return (
    <HomeErrorBoundary>
      <section className="relative flex flex-col gap-8">
        <h2 className={`text-3xl font-bold text-primary ${Krypton.className}`}>
          Proyectos
        </h2>
        <ProjectFilter
          technologies={technologies}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
        />
        {isLoading ? (
          <ProjectsLoading />
        ) : (
          <ProjectList projects={projects} />
        )}
      </section>
    </HomeErrorBoundary>
  );
}; 