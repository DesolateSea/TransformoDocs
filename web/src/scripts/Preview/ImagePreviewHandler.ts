import { IPreviewHandler } from "../../Lib/interfaces/MLProcess/IPreviewHandler";
export class ImagePreviewHandler implements IPreviewHandler {
  canHandle(file: File): boolean {
    return file.type.startsWith("image/");
  }

  async generatePreview(file: File): Promise<string | null> {
    return URL.createObjectURL(file);
  }
}
