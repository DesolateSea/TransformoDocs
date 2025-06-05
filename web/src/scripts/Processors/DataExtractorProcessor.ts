import { ProcessingResult, ProcessingMode } from "../../types/ProcessingTypes";
import { mlService } from "../../services/MLService";
import { BaseProcessor } from "./BaseProcessor";
import type { AxiosResponse } from "axios";

export class DataExtractorProcessor extends BaseProcessor {
  getMode(): ProcessingMode {
    return "dataExtractor";
  }

  canHandle(file: File): boolean {
    return file.type.startsWith("image/") || file.type === "application/pdf";
  }

  async process(file: File): Promise<ProcessingResult> {
    this.updateProgress(30);
    await this.sleep(500);

    const res: AxiosResponse<any> = await mlService.responseDataExtraction(
      file
    );

    this.updateProgress(70);
    await this.sleep(500);
    // 1) Create a Blob from the text
    const entitiesJson = JSON.stringify(res.data, null, 2);
    const blob = new Blob([entitiesJson], { type: "application/json" });

    // 2) Generate a URL for that Blob
    const previewURL = URL.createObjectURL(blob);

    return {
      data: res.data,
      status: res.status,
      output: previewURL,
    };
  }
}
