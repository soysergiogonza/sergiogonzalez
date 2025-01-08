import { useState } from "react";
import { Krypton } from "@/utils/utils";
import Image from "next/image";
import {experiences} from "@/components/pages/home/ProfessionalExperience/data";

export const ProfessionalExperience = () => {
  return (
      <article>
          <h2 className={`text-3xl font-bold text-primary ${Krypton.className}`}>
              Professional Experience
          </h2>
          <ul className="mt-8 space-y-4">
              {experiences.map((project) => {
                  const [isOpen, setIsOpen] = useState(false);

                  return (
                      <li
                          className="bg-background-elevated p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                          key={project.id}
                      >
                          <div className="flex items-center justify-between cursor-pointer"
                               onClick={() => setIsOpen(!isOpen)}>
                              <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0 bg-background-color p-2 rounded-lg">
                                      <Image
                                          src={project.logo}
                                          alt={project.company}
                                          width={100}
                                          height={100}
                                          className="w-24 h-24 object-cover"
                                      />
                                  </div>
                                  <div className="flex-1">
                                      <p className="font-semibold text-lg">{project.title}</p>
                                      <div className="flex justify-between text-sm text-span-subDescription mt-1">
                      <span>
                        {project.company} · {project.badge} · {project.location}
                      </span>
                                          <span>
                        {project.startDate} - {project.endDate || "Present"}
                      </span>
                                      </div>
                                  </div>
                              </div>
                              <button className="text-primary text-2xl">
                                  {isOpen ? "−" : "+"}
                              </button>
                          </div>
                          {isOpen && (
                              <ul className="mt-2 text-sm text-text-secondary list-disc list-inside md:pl-32">
                                  {project.description.map((description, index) => (
                                      <li key={index}>{description}</li>
                                  ))}
                              </ul>
                          )}
                      </li>
                  );
              })}
          </ul>
      </article>
  );
};
