import { mlService } from "../../services/MLService";
import { BaseProcessor } from "./BaseProcessor";
import type { AxiosResponse } from "axios";
import type { NERResponse } from "../../types/NERResponse";
import type {
  ProcessingMode,
  ProcessingResult,
} from "../../types/ProcessingTypes";
export class NERProcessor extends BaseProcessor {
  getMode(): ProcessingMode {
    return "ner";
  }

  canHandle(file: File): boolean {
    return file.type === "text/plain" || file.type === "application/pdf";
  }

  async process(file: File): Promise<ProcessingResult> {
    let textContent: string;

    if (file.type === "text/plain") {
      this.updateProgress(30);
      textContent = await file.text();
      this.updateProgress(50);
    } else {
      this.updateProgress(30);
      await this.sleep(500);
      textContent = await mlService.extractText(file);
      this.updateProgress(50);
    }

    await this.sleep(500);
    const nerRes: AxiosResponse<NERResponse> = await mlService.responseNER(
      textContent
    );

    this.updateProgress(90);
    await this.sleep(4500);

    this.updateProgress(100);
    await this.sleep(1000);
    // Prepare JSON blob URL for preview/download
    const entitiesJson = JSON.stringify(nerRes.data.entities, null, 2);
    const blob = new Blob([entitiesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    return {
      data: nerRes.data,
      status: nerRes.status,
      output: url,
    };
  }
}
