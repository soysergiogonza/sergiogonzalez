export const ENV = {
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
} as const;

// Validación de variables de entorno
Object.entries(ENV).forEach(([key, value]) => {
  if (!value) {
    console.error(`⚠️ ${key} no está configurado`);
  }
}); 