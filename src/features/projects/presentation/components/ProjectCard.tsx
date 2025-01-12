import { Project } from '../../domain/entities/Project';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group rounded-xl overflow-hidden bg-background-elevated/50 border border-gray-800"
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary mb-4">
          {project.description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full 
                       bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Enlaces */}
        <div className="flex gap-4">
          {project.hasGithubLink() && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
          )}
          {project.hasDemoLink() && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
            >
              <FiExternalLink />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}; 