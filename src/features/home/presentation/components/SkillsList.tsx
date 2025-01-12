import { SkillsListProps } from './types';
import { IconType } from 'react-icons';
import { memo } from 'react';

export const SkillsList = memo(({ skills, isLoading, error }: SkillsListProps) => {
  if (isLoading) return <div>Cargando habilidades...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderIcon = (Icon: IconType, color: string, className: string) => {
    return <Icon className={className} style={{ color }} />;
  };

  const getTechName = (name: string): string => {
    const techNames: Record<string, string> = {
      'FaReact': 'React',
      'FaJs': 'JavaScript',
      'SiTypescript': 'TypeScript',
      'SiNextdotjs': 'Next.js',
      'FaHtml5': 'HTML',
      'FaCss3Alt': 'CSS',
      'SiTailwindcss': 'Tailwind CSS',
      'FaNode': 'Node.js'
    };
    return techNames[name] || name;
  };

  return (
    <div 
      className="flex flex-wrap gap-6"
      role="list"
      aria-label="Lista de habilidades técnicas"
    >
      {skills.map((skill) => (
        <div 
          key={skill.id}
          role="listitem"
          className="flex items-center gap-3 px-8 py-3 
                   bg-background-elevated/50 rounded-full
                   border border-gray-800 hover:border-primary 
                   transition-all duration-300"
          tabIndex={0}
          aria-label={`${skill.name} - ${skill.getExperienceLevel()}`}
        >
          {renderIcon(skill.icon, skill.color, "text-2xl")}
          <span className="text-white text-lg font-medium">
            {getTechName(skill.icon.name)}
          </span>
        </div>
      ))}
    </div>
  );
}); 