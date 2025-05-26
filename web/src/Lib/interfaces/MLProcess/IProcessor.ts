import {
  ProcessingMode,
  ProcessingResult,
} from "../../../types/ProcessingTypes";
export interface IProcessor {
  process(file: File): Promise<ProcessingResult>;
  getMode(): ProcessingMode;
  canHandle(file: File): boolean;
}
