# Arquitectura

## Implementación de Clean Architecture

La característica Home sigue los principios de Clean Architecture con tres capas principales:

### Capa de Dominio
Contiene la lógica de negocio y entidades:
- `Experience.ts`: Entidad de experiencia profesional
- `Skill.ts`: Entidad de habilidad técnica
- Interfaces de repositorio
- Constantes y tipos

### Capa de Infraestructura
Implementa el acceso a datos mediante:
- `LocalExperienceRepository.ts`
- `LocalSkillRepository.ts`

### Capa de Presentación
Componentes UI y gestión de estado:
- Componentes (ErrorBoundary, LoadingStates, etc.)
- Contenedores (Skills, ProfessionalExperience)
- Hooks personalizados (useSkills, useExperiences)


/
🔑 Características Implementadas
Clean Architecture
Componentes optimizados
Manejo de estados y errores
Animaciones y loading states
SEO básico
Accesibilidad

src/features/home/
├── domain/
│   ├── constants/
│   │   ├── experiences.ts
│   │   └── skills.ts
│   ├── entities/
│   │   ├── Experience.ts
│   │   └── Skill.ts
│   └── repositories/
├── infrastructure/
│   └── repositories/
└── presentation/
├── components/
│   ├── ErrorBoundary.tsx
│   ├── ExperienceList.tsx
│   ├── LoadingStates.tsx
│   └── SkillsList.tsx
├── containers/
│   ├── Home.tsx
│   ├── ProfessionalExperience.tsx
│   └── Skills.tsx
└── hooks/
