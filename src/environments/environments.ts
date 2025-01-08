// Notion
export const NOTION_API_KEY = process.env.NOTION_API_KEY;
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
  console.error("⚠️ NOTION_API_KEY no está configurado");
}

if (!NOTION_DATABASE_ID) {
  console.error("⚠️ NOTION_DATABASE_ID no está configurado");
}
