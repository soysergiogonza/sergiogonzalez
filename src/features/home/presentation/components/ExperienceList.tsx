import { ExperienceListProps } from './types';
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

export const ExperienceList = memo(({
  experiences,
  isLoading,
  error
}: ExperienceListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) return <div>Cargando experiencias...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex flex-col gap-8">
      {/* Línea vertical de timeline */}
      <div className="absolute left-[25px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-secondary/50" />

      {experiences.map((experience) => (
        <motion.div 
          key={experience.id}
          className="relative pl-16"
          initial={false}
        >
          {/* Punto en la línea de tiempo */}
          <div className="absolute left-[21px] top-[24px] w-[10px] h-[10px] rounded-full bg-primary" />
          
          <div 
            onClick={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
            className="cursor-pointer group"
          >
            {/* Cabecera de la experiencia */}
            <div className="flex items-start gap-6 p-6 rounded-xl 
                          bg-background-elevated/50 border border-gray-800 
                          hover:border-primary transition-all duration-300">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={48}
                height={48}
                className="rounded-lg object-cover"
                loading="lazy"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-text-primary">
                    {experience.title}
                  </h3>
                  <a 
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiExternalLink />
                  </a>
                </div>
                
                <p className="text-text-secondary">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {experience.startDate} - {experience.endDate || 'Presente'} • {experience.duration}
                </p>
              </div>
            </div>

            {/* Contenido expandible */}
            <AnimatePresence>
              {expandedId === experience.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 ml-4 p-6 rounded-xl bg-background-elevated/30 border border-gray-800">
                    <ul className="space-y-3">
                      {experience.description.map((desc, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-2 text-text-secondary"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 text-sm rounded-full 
                                   bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

ExperienceList.displayName = 'ExperienceList'; 