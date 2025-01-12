# Estados de Carga

## SkillsLoading
Componente que muestra una animación de carga para la sección de habilidades.

### Implementación
```typescript
export const SkillsLoading = () => (
	<div className="space-y-4">
		<motion.div
			className="h-8 w-32 bg-background-elevated/50 rounded-lg"
			animate={{ opacity: [0.5, 0.8, 0.5] }}
			transition={{ duration: 1.5, repeat: Infinity }}
		/>
	{/* Animación de skills */}
	</div>
);
```

### Características
- Usa Framer Motion para animaciones suaves
- Simula la carga de 5 skills
- Animación de pulso con opacidad variable
- Diseño consistente con los componentes cargados

## ExperienceLoading
Componente que muestra una animación de carga para la sección de experiencia.

### Implementacion
```typescript
export const ExperienceLoading = () => (
    <div className="space-y-6">
        {/* Animación de experiencias */}
		{[1,2,3].map((i) => (
			<motion.div
				key={i}
				className="space-y-4"
				animate={{ opacity: [0.5, 0.8, 0.5] }}
    			transition={{
					duration: 1.5, 
					repeat: Infinity, 
					delay: i 0.2
				}}>
    	<div className="h-24 bg-background-elevated/50 rounded-xl" />
        </motion.div>
		))}
	</div>
);
```
