import { FaCss3Alt, FaHtml5, FaJs, FaNode, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const TechIcons = [
  { icon: FaReact, color: "#61DAFB" },
  { icon: FaJs, color: "#F7DF1E" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: SiNextdotjs, color: "#ffffff" },
  { icon: FaHtml5, color: "#E34F26" },
  { icon: FaCss3Alt, color: "#1572B6" },
  { icon: SiTailwindcss, color: "#06B6D4" },
  { icon: FaNode, color: "#339933" },
];

export const BackgroundCircle = () => {
  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[15]'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div>
          {TechIcons.map((tech, index) => {
            const angle = (index * 360) / TechIcons.length;
            const radius = 280;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className='absolute transform -translate-x-1/2 -translate-y-1/2'
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <tech.icon
                  size={70}
                  className='opacity-10 transition-all duration-300
                               hover:opacity-100 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]'
                  style={{ color: tech.color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
