export const ENV = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const;

// Validación de variables de entorno
Object.entries(ENV).forEach(([key, value]) => {
  if (!value) {
    console.error(`⚠️ ${key} no está configurado`);
  }
}); 