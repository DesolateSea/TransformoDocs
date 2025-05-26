// src/interfaces/IPreviewHandler.ts
export interface IPreviewHandler {
  canHandle(file: File): boolean;
  generatePreview(file: File): Promise<string | null>;
}
