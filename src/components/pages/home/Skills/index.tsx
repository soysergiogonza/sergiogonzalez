import { skills } from "@/components/pages/home/Skills/data";
import { Krypton } from "@/utils";

export const Skills = () => {
  return (
    <article className='relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl blur-3xl' />
      <h2
        className={`text-3xl font-bold text-primary mb-8 ${Krypton.className}`}
      >
        Skills
      </h2>
      <ul className='relative flex flex-wrap gap-4'>
        {skills.map((skill) => (
          <li
            key={skill}
            className='px-4 py-2 bg-background-elevated/50 backdrop-blur-sm rounded-lg
                         text-text-secondary hover:text-primary border border-primary/10
                         hover:border-primary/30 transition-all duration-300'
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
};
