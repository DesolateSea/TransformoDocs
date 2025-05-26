import { IProcessor } from "../../Lib/interfaces/MLProcess/IProcessor";
import { IProgressTracker } from "../../Lib/interfaces/MLProcess/IProgressTracker";
import { ProcessingMode, ProcessingResult } from "../../types/ProcessingTypes";
export abstract class BaseProcessor implements IProcessor {
  protected progressTracker?: IProgressTracker;

  constructor(progressTracker?: IProgressTracker) {
    this.progressTracker = progressTracker;
  }

  abstract process(file: File): Promise<ProcessingResult>;
  abstract getMode(): ProcessingMode;
  abstract canHandle(file: File): boolean;

  protected async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected updateProgress(progress: number): void {
    this.progressTracker?.updateProgress(progress);
  }
}
