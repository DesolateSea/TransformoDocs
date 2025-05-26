import { IProgressTracker } from "../Lib/interfaces/MLProcess/IProgressTracker";
import { IProcessor } from "../Lib/interfaces/MLProcess/IProcessor";
import { ProcessingMode } from "../types/ProcessingTypes";
import { OCRProcessor } from "../scripts/Processors/OCRProcessor";
import { NERProcessor } from "../scripts/Processors/NERProcessor";
export class ProcessorFactory {
  private static processors: Map<
    ProcessingMode,
    new (progressTracker?: IProgressTracker) => IProcessor
  > = new Map([
    ["ocr", OCRProcessor],
    ["ner", NERProcessor],
  ]);

  static createProcessor(
    mode: ProcessingMode,
    progressTracker?: IProgressTracker
  ): IProcessor {
    const ProcessorClass = this.processors.get(mode);
    if (!ProcessorClass) {
      throw new Error(`Processor for mode '${mode}' not found`);
    }
    return new ProcessorClass(progressTracker);
  }

  static registerProcessor(
    mode: ProcessingMode,
    processorClass: new (progressTracker?: IProgressTracker) => IProcessor
  ): void {
    this.processors.set(mode, processorClass);
  }

  static getAvailableModes(): ProcessingMode[] {
    return Array.from(this.processors.keys());
  }
}
