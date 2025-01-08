import Link from "next/link";

export const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40'>
      {/* Background Elements con z-index más bajo */}
      <div className='absolute w-full w-max-[100%] h-full z-0'>
        {/* Texto Frontend en el fondo */}
        <div className='absolute flex w-full items-center justify-center opacity-[0.02] select-none pointer-events-none'>
          <span className='text-[16rem] text-center font-bold text-white'>
            FRONTEND
          </span>
        </div>

        {/* Gradientes y patrones previos... */}
        <div
          className='absolute  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                        from-primary/10 via-background-elevated/50 to-transparent'
        />
        <div
          className='absolute bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
                        from-secondary/20 via-transparent to-transparent'
        />
        <div
          className='absolute bg-[linear-gradient(to_right,#8b5cf680_1px,transparent_1px),
                        linear-gradient(to_bottom,#8b5cf680_1px,transparent_1px)] bg-[size:4rem_4rem]
                        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10'
        />

        {/* Círculos decorativos */}
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl' />
      </div>

      {/* Main Content con z-index más alto */}
      <div className='relative z-[20] max-w-[120ch] mx-auto px-8 text-center'>
        <div className='flex flex-col items-center gap-8'>
          {/* Nombre y Título */}
          <div className='space-y-4 mb-8'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-primary/90 to-secondary bg-clip-text text-transparent'>
              Sergio González Sánchez
            </h1>
            <p className='text-2xl md:text-3xl text-text-secondary font-light tracking-wider'>
              Frontend Developer / Frontend Architect
            </p>
          </div>

          {/* Tagline */}
          <h2
            className='text-3xl md:text-5xl lg:text-6xl font-bold
                         bg-gradient-to-r from-white via-primary/90 to-secondary bg-clip-text text-transparent
                         max-w-4xl leading-tight'
          >
            Hago aplicaciones web escalables y fáciles de usar.
            <span className='inline-block bg-primary text-white rounded-full px-3 py-1 text-sm font-semibold ml-2'>
              Potencio mi trabajo con IA
            </span>
          </h2>

          {/* Descripción */}
          <p className='text-xl md:text-2xl text-text-secondary max-w-2xl'>
            Especializado en crear experiencias web únicas y escalables con las
            mejores prácticas de la industria
          </p>

          {/* CTA Button */}
          <Link
            href='/contact'
            className='group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden
                       bg-gradient-to-r from-primary to-secondary
                       hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300
                       border border-white/10'
          >
            <span className='relative z-10'>Contacto</span>
            <div className='absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </Link>
        </div>
      </div>
    </section>
  );
};
