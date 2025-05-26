import { ImagePreviewHandler } from "../scripts/Preview/ImagePreviewHandler";
import { TextPreviewHandler } from "../scripts/Preview/TextPreviewHandler";
import type { IPreviewHandler } from "../Lib/interfaces/MLProcess/IPreviewHandler";

export class PreviewService {
  private handlers: IPreviewHandler[] = [
    new ImagePreviewHandler(),
    new TextPreviewHandler(),
  ];

  addHandler(handler: IPreviewHandler): void {
    this.handlers.push(handler);
  }

  async generatePreview(
    file: File
  ): Promise<{ url: string | null; text: string | null }> {
    for (const handler of this.handlers) {
      if (handler.canHandle(file)) {
        const preview = await handler.generatePreview(file);

        if (handler instanceof ImagePreviewHandler) {
          return { url: preview, text: null };
        } else {
          return { url: null, text: preview };
        }
      }
    }

    return { url: null, text: null };
  }
}
