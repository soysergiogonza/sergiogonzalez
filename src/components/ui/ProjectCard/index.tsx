import React from 'react';
import { Project } from '@/types/projects';
import Image from 'next/image';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-background-elevated/50 backdrop-blur-xl rounded-2xl p-8 
                border border-gray-800 transition-all duration-500 
                hover:shadow-2xl hover:shadow-primary/20
                hover:border-primary/50 hover:-translate-y-1"
    >
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 
                    border-primary rounded-tl-2xl transition-all duration-500 
                    group-hover:w-24 group-hover:h-24"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 
                    border-secondary rounded-tr-2xl transition-all duration-500 
                    group-hover:w-24 group-hover:h-24"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 
                    border-primary rounded-bl-2xl transition-all duration-500 
                    group-hover:w-24 group-hover:h-24"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 
                    border-secondary rounded-br-2xl transition-all duration-500 
                    group-hover:w-24 group-hover:h-24"></div>

      <div className="relative">
        {/* Status Badge */}
        {project.status && (
          <div className="absolute -top-12 left-0 px-6 py-2 
                        bg-gradient-to-r from-primary to-secondary 
                        rounded-full text-sm text-white">
            {project.status}
          </div>
        )}

        {/* Title & Description */}
        <h2 className="text-3xl font-bold mb-2 text-white">
          {project.title}
        </h2>

        {project.featured && (
          <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text 
                      bg-gradient-to-r from-primary to-secondary">
            Featured Project
          </h3>
        )}

        <p className="text-lg text-gray-300 mb-8 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mb-8 text-gray-300">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full 
                       bg-gradient-to-r from-primary/10 to-secondary/10 
                       hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 
                       border border-gray-700 hover:border-primary 
                       hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 
                       rounded-full bg-gradient-to-r from-primary to-secondary
                       hover:opacity-90 transition-all duration-300 text-white"
            >
              Live Preview
              <FiExternalLink className="text-lg" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 
                       rounded-full border border-gray-700 hover:border-primary
                       hover:bg-primary/10 transition-all duration-300 text-white"
            >
              <FiGithub className="text-lg" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
