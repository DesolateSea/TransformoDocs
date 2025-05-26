import { IPreviewHandler } from "../../Lib/interfaces/MLProcess/IPreviewHandler";
export class TextPreviewHandler implements IPreviewHandler {
  canHandle(file: File): boolean {
    return file.type === "text/plain" || file.type === "application/json";
  }

  async generatePreview(file: File): Promise<string | null> {
    return await file.text();
  }
}
