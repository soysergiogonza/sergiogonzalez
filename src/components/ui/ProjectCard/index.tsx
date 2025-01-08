import {FC} from "react";

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description: string;
  link: string;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
      <div className="p-4">
        {/* Card Container */}
        <div
            className="w-[350px] h-[250px] bg-[#243137] relative grid place-content-center rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:rounded-none hover:scale-110 p-2">
          {/* Rotating Border */}
          <h3 className="-translate-x-1/2 -translate-y-1/2 text-[#bd9f67] text-[14px] z-10">
            {project.title}
          </h3>
          <div
              className="absolute inset-0 border-2 border-[#bd9f67] opacity-0 rotate-[10deg] transition-all duration-500 ease-in-out group-hover:inset-[15px] group-hover:opacity-100 group-hover:rotate-0"/>
          {/* Content Container */}
          <div className="transition-all duration-500 ease-in-out">
            {/* Logo Container */}
            <div
                className="h-[35px] relative w-[33px] overflow-hidden transition-all duration-1000 ease-in-out hover:w-[134px] group">
              {/* Título del Proyecto */}


              {/* Imagen del Proyecto */}
              <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0 rounded"
                  style={{objectFit: 'cover'}}
              />

              {/* Descripción y botón al hacer hover */}
              <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 bg-[#243137]">
                <p className="text-[#bd9f67] text-[12px] text-center">{project.description}</p>
                <a href={project.link} className="mt-2 px-4 py-2 bg-[#bd9f67] text-white rounded">
                  Ver Proyecto
                </a>
              </div>
            </div>
          </div>

          {/* Universe of UI Text */}
          <span
              className="absolute left-1/2 bottom-[13px] -translate-x-1/2 text-[6px] uppercase px-[5px] pl-2 text-[#bd9f67] bg-[#243137] opacity-0 tracking-[7px] transition-all duration-500 ease-in-out group-hover:tracking-[3px] group-hover:opacity-100">
          universe of ui
        </span>
        </div>
      </div>
  );
};
