# Error Boundary

## Descripción
Componente que maneja los errores en la aplicación, evitando que la aplicación se rompa completamente.

## Uso
```typescript
<HomeErrorBoundary>
	<TuComponente />
</HomeErrorBoundary>
```

## Props
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| children | ReactNode | Contenido a renderizar |
| fallback | ReactNode? | UI personalizada para errores |

## Ejemplo de Error
```typescript
try {
// Código que puede fallar
} catch (error) {
  return (
    <div className="p-4 rounded-lg bg-background-elevated/50 border border-red-500/20">
      <h2 className="text-xl font-bold text-red-500 mb-2">
          Algo salió mal
      </h2>
      <p className="text-text-secondary">
          Por favor, intenta recargar la página
      </p>
    </div>
  );
}
```
