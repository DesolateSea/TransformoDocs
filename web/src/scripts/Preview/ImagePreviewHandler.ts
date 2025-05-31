import { IPreviewHandler } from "../../Lib/interfaces/MLProcess/IPreviewHandler";

export class ImagePreviewHandler implements IPreviewHandler {
  constructor(private readonly maxSizeKB: number = 2048) {}

  canHandle(file: File): boolean {
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    const isImage = allowedImageTypes.includes(file.type);
    const isSizeOk = file.size <= this.maxSizeKB * 1024;
    return isImage && isSizeOk;
  }

  async generatePreview(file: File): Promise<string | null> {
    return URL.createObjectURL(file);
  }
}
