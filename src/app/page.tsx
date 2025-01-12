"use client";

import { Hero } from "@/components/pages/home/Hero";
import { Skills, ProfessionalExperience } from "@/features/home/presentation/containers";
import { About } from "@/components/pages/home/About";

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-background via-background-secondary to-background pb-20'>
      <Hero />
      <main className='relative max-w-[120ch] mx-auto px-8 flex flex-col gap-16'>
        <Skills />
        <About />
        <ProfessionalExperience />
      </main>
    </div>
  );
};

export default Home;
