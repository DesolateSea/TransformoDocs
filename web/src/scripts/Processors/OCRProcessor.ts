import { ProcessingResult, ProcessingMode } from "../../types/ProcessingTypes";
import { mlService } from "../../services/MLService";
import { BaseProcessor } from "./BaseProcessor";
import type { AxiosResponse } from "axios";

export class OCRProcessor extends BaseProcessor {
  getMode(): ProcessingMode {
    return "ocr";
  }

  canHandle(file: File): boolean {
    return file.type.startsWith("image/") || file.type === "application/pdf";
  }

  async process(file: File): Promise<ProcessingResult> {
    this.updateProgress(30);
    await this.sleep(500);

    const res: AxiosResponse<string> = await mlService.responseOCR(file);

    this.updateProgress(70);
    await this.sleep(500);
    // 1) Create a Blob from the text
    const textBlob = new Blob([res.data], { type: "text/plain" });

    // 2) Generate a URL for that Blob
    const previewURL = URL.createObjectURL(textBlob);

    return {
      data: res.data,
      status: res.status,
      output: previewURL,
    };
  }
}
