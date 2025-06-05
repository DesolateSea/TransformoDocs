import {
  ProcessingStrategy,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { mlService } from "../../services/MLService";

export class OCRStrategy implements ProcessingStrategy {
  readonly id = "ocr";
  readonly displayName = "Extract Data (OCR Only)";
  readonly description = "Extract text content from documents";

  async process(file: File): Promise<DownloadProssingResult> {
    const extracted = await mlService.extractText(file);
    return {
      data: extracted,
      format: "text",
      filename: "extracted-text",
    };
  }
  validateFile(file: File): boolean {
    return file.type.startsWith("application/pdf");
  }
}
