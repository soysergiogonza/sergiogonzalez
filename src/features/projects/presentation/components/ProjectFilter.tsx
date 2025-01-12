import { memo } from 'react';

interface ProjectFilterProps {
  technologies: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}

export const ProjectFilter = memo(({ 
  technologies, 
  selectedTech, 
  onSelectTech 
}: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onSelectTech(null)}
        className={`px-4 py-2 rounded-full transition-all duration-300
                  ${!selectedTech 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'bg-background-elevated text-gray-400 hover:bg-background-elevated/80 border border-gray-700 hover:border-primary'}`}
      >
        Todo
      </button>
      {technologies.map((tech) => (
        <button
          key={tech}
          onClick={() => onSelectTech(tech)}
          className={`px-4 py-2 rounded-full transition-all duration-300
                    ${selectedTech === tech 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'bg-background-elevated text-gray-400 hover:bg-background-elevated/80 border border-gray-700 hover:border-primary'}`}
        >
          {tech}
        </button>
      ))}
    </div>
  );
});

ProjectFilter.displayName = 'ProjectFilter'; 