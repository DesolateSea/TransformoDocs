import {
  DownloadProssingResult,
  ProcessingStrategy,
} from "../../types/ProcessingTypes";
import { mlService } from "../../services/MLService";
export class DataExtractorStrategy implements ProcessingStrategy {
  readonly id = "dataExtractor";
  readonly displayName = "Advanced Data Extraction";
  readonly description = "Extract structured data from complex documents";
  async process(file: File): Promise<DownloadProssingResult> {
    const extracted = await mlService.extractData(file);
    return {
      data: extracted,
      format: "json",
      filename: "extracted-data",
    };
  }
  validateFile(file: File): boolean {
    return file.type.startsWith("application/pdf");
  }
}
