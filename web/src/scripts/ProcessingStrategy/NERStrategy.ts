import {
  ProcessingStrategy,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { mlService } from "../../services/MLService";
import { Entity } from "../../types/NERResponse";
export class NERStrategy implements ProcessingStrategy {
  readonly id = "ner";
  readonly displayName = "Convert to Machine Readable Format (OCR + NER)";
  readonly description = "Extract and identify entities from documents";

  async process(file: File): Promise<DownloadProssingResult> {
    const nerResult: Entity[] = await mlService.extractFileInformation(file);
    return {
      data: nerResult,
      format: "json",
      filename: "ner-result",
    };
  }
  validateFile(file: File): boolean {
    return file.type.startsWith("text/plain");
  }
}
