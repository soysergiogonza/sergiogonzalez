# Lista de Experiencias

## Descripción
Componente que muestra la experiencia profesional en formato de timeline.

## Características
- Timeline vertical con puntos de conexión
- Tarjetas expandibles con detalles
- Animaciones de expansión/contracción
- Enlaces externos a empresas
- Badges de tecnologías usadas

## Implementación
```typescript
export const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences,
  isLoading,
  error
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // ... resto del código
}
```
## Estados
- Normal: Muestra información básica
- Expandido: Muestra descripción detallada y tecnologías
- Loading: Muestra skeleton loader
- Error: Muestra mensaje de error
## Interacciones
- Click para expandir/contraer detalles
- Hover en enlaces externos
- Animaciones suaves en transiciones
