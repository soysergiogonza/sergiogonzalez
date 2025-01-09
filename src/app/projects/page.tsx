"use client"

import React, { useState } from 'react';
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

const ProjectsPage = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  const filteredProjects = selectedTech
    ? projects.filter(project => project.technologies.includes(selectedTech))
    : projects;

  return (
    <div className="min-h-screen p-8 md:p-12 bg-gradient-to-b from-background via-background-secondary to-background">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Proyectos
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          Una colección de proyectos en los que he trabajado, que muestran mis habilidades y experiencia en desarrollo web.
        </p>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full transition-all duration-300
                      ${!selectedTech 
                        ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                        : 'bg-background-elevated text-gray-400 hover:bg-background-elevated/80 border border-gray-700 hover:border-primary'}`}
          >
            Todo
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full transition-all duration-300
                        ${selectedTech === tech 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                          : 'bg-background-elevated text-gray-400 hover:bg-background-elevated/80 border border-gray-700 hover:border-primary'}`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))
        ) : (
          <p className="text-gray-400 col-span-2 text-center text-lg">
            No projects found with the selected technology.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
