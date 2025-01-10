import { Client } from "@notionhq/client";
import { NOTION_API_KEY } from "@/core/config/env";

export class NotionService {
  private client: Client;

  constructor() {
    if (!NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY es requerido");
    }
    this.client = new Client({ auth: NOTION_API_KEY });
  }

  // Métodos del servicio
} 