import { SkillsListProps } from './types';
import { IconType } from 'react-icons';
import { memo } from 'react';
import {TECH_STACK} from '@/features/home/domain/constants/skills';

export const SkillsList = memo(({ isLoading, error }: SkillsListProps) => {
  if (isLoading) return <div>Cargando habilidades...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderIcon = (Icon: IconType, color: string, className: string) => {
    return <Icon className={className} style={{ color }} />;
  };

  return (
    <div 
      className="flex flex-wrap gap-6"
      role="list"
      aria-label="Lista de habilidades técnicas"
    >
      {TECH_STACK.map((skill) => (
        <div 
          key={skill.id}
          role="listitem"
          className="flex items-center gap-3 px-8 py-3 
                   bg-background-elevated/50 rounded-full
                   border border-gray-800 hover:border-primary
                   transition-all duration-300"
          tabIndex={0}
          aria-label={`${skill.name}}`}
        >
          {renderIcon(skill.icon, skill.color, "text-2xl")}
          <span className="capitalize text-white text-lg font-medium ">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}); 