import { ProcessingStrategyRegistry } from "../scripts/ActionHandler/ProcessingStrategyRegistry";
import { DownloadProssingResult } from "../types/ProcessingTypes";
export class ProcessingEngine {
  private strategyRegistry: ProcessingStrategyRegistry;
  private progressCallback: (progress: number) => void;

  constructor(
    strategyRegistry: ProcessingStrategyRegistry,
    progressCallback: (progress: number) => void
  ) {
    this.strategyRegistry = strategyRegistry;
    this.progressCallback = progressCallback;
  }

  async process(
    file: File,
    strategyId: string
  ): Promise<DownloadProssingResult> {
    const strategy = this.strategyRegistry.get(strategyId);
    if (!strategy) {
      throw new Error(`Strategy '${strategyId}' not found`);
    }

    if (strategy.validateFile && !strategy.validateFile(file)) {
      throw new Error(`File type not supported by ${strategy.displayName}`);
    }

    // Simulate processing with progress updates
    this.progressCallback(10);
    await this.sleep(1000);

    this.progressCallback(30);
    const result = await strategy.process(file);

    this.progressCallback(99);
    await this.sleep(1000);

    this.progressCallback(100);
    await this.sleep(300);

    return result;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
