# Dominio del Home

## Entidades

### Experience (Experiencia)
Representa una experiencia profesional.
```typescript
class Experience {
	constructor(
		public readonly id: string, 
		public readonly title: string, 
		public readonly company: string, 
		public readonly type: CompanyType, 
		public readonly location: string, 
		public readonly link: string, 
		public readonly startDate: string, 
		public readonly endDate: string | undefined, 
		public readonly duration: string, 
		public readonly logo: string, 
		public readonly description: string[], 
		public readonly skills: string[]
	) {}
	// Métodos
	public isCurrentJob(): boolean
	public getYearsOfExperience(): number
}
```

### Skill (Habilidad)
Representa una habilidad técnica.
```typescript
class Skill {
	constructor(
		public readonly id: string, 
		public readonly name: string, 
		public readonly icon: IconType, 
		public readonly category: string, 
		public readonly level: number, 
		public readonly color: string
	) {}
// Métodos
	public isAdvanced(): boolean
	public getExperienceLevel(): 'Básico' | 'Intermedio' | 'Avanzado'
}
```

## Constantes

### CompanyType
```typescript
enum CompanyType {
	STARTUP = 'Startup',
	ENTERPRISE = 'Enterprise',
	FREELANCE = 'Freelance',
	EDUCATION = 'Education',
	CONTRACT = 'Contract',
	TEMPORAL = 'Temporal'
}
```

### TechStack
```typescript
interface TechStack {
	id: string;
	icon: IconType;
	color: string;
	category: TechCategory;
	level: TechLevel;
}
```

## Repositorios

### IExperienceRepository
```typescript
interface IExperienceRepository {
	getAllExperiences(): Promise<Experience[]>;
	getCurrentExperience(): Promise<Experience>;

	getExperiencesByYear(year: number): Promise<Experience[]>;
}
```

### ISkillRepository
```typescript
interface ISkillRepository {
	getAllSkills(): Promise<Skill[]>;
	getSkillsByCategory(category: string): Promise<Skill[]>;

	getTopSkills(limit: number): Promise<Skill[]>;
}
```

## Implementaciones

### LocalExperienceRepository
Implementación local del repositorio de experiencias que utiliza datos estáticos.

Métodos principales:
- `getAllExperiences()`: Obtiene todas las experiencias
- `getCurrentExperience()`: Obtiene la experiencia actual
- `getExperiencesByYear()`: Filtra experiencias por año

### LocalSkillRepository
Implementación local del repositorio de habilidades que utiliza datos estáticos.

Métodos principales:
- `getAllSkills()`: Obtiene todas las habilidades
- `getSkillsByCategory()`: Filtra habilidades por categoría
- `getTopSkills()`: Obtiene las habilidades principales
