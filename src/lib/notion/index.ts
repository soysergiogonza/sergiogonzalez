import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY no está configurado");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
