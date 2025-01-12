# Infraestructura

## Repositorios Locales

### LocalExperienceRepository
Implementación del repositorio de experiencias que maneja los datos localmente.

```typescript
export class LocalExperienceRepository implements IExperienceRepository {
	async getAllExperiences(): 
		Promise<Experience[]>
	async getCurrentExperience(): 
		Promise<Experience>
	async getExperiencesByYear(year: number):
		Promise<Experience[]>
}
```

#### Métodos Principales
- `getAllExperiences`: Obtiene todas las experiencias desde el archivo de constantes
- `getCurrentExperience`: Obtiene la experiencia actual (donde endDate es 'Presente')
- `getExperiencesByYear`: Filtra experiencias por año específico

### LocalSkillRepository
Implementación del repositorio de habilidades que maneja los datos localmente.
```typescript
export class LocalSkillRepository implements ISkillRepository {
	async getAllSkills(): Promise<Skill[]>
	async getSkillsByCategory(category: string): Promise<Skill[]>
	async getTopSkills(limit: number): Promise<Skill[]>
}
```

## Componentes de UI Reutilizables

### BackgroundCircle
Componente que muestra los iconos de tecnologías en un círculo animado.
```typescript
export const BackgroundCircle = () => {
// Renderiza iconos de tecnologías en un círculo
// Usa TECH_STACK para los datos
// Implementa animaciones y efectos hover
}
```

#### Características
- Disposición circular de iconos
- Animaciones en hover
- Colores personalizados por tecnología
- Efecto de opacidad y escala
