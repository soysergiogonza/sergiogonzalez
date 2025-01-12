# Lista de Habilidades

## Descripción
Componente que muestra la lista de habilidades técnicas con iconos y nombres.

### Implementación
```typescript
export const SkillsList: React.FC<SkillsListProps> = ({
 	skills,
  	isLoading,
  	error
}) => {
  // Renderizado de skills
}
```

### Características
- Diseño con pills/badges redondeados
- Iconos de tecnologías con colores personalizados
- Hover effects con transiciones suaves
- Nombres normalizados de tecnologías
- Layout responsive con flex-wrap

### Props
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| skills | Skill[] | Lista de habilidades |
| isLoading | boolean | Estado de carga |
| error | string | null | Mensaje de error |
