import { TECH_STACK } from "@/features/home/domain/constants/skills";

export const BackgroundCircle = () => {
  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[15]'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div>
          {TECH_STACK.map((tech, index) => {
            const angle = (index * 360) / TECH_STACK.length;
            const radius = 280;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={tech.id}
                className='absolute transform -translate-x-1/2 -translate-y-1/2'
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <tech.icon
                  size={70}
                  className='opacity-10 transition-all duration-300
                           hover:opacity-100 hover:scale-125 
                           hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]'
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
