import React from 'react';
import { projects } from "@/data/projects";
import {ProjectCard} from "@/components/ui/ProjectCard";

const ProjectsPage = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Projects</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
              <ProjectCard project={project}/>
          ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
