import { ProcessingStrategy } from "../../types/ProcessingTypes";
export class ProcessingStrategyRegistry {
  private strategies = new Map<string, ProcessingStrategy>();

  register(strategy: ProcessingStrategy): void {
    this.strategies.set(strategy.id, strategy);
  }

  get(id: string): ProcessingStrategy | undefined {
    return this.strategies.get(id);
  }

  getAll(): ProcessingStrategy[] {
    return Array.from(this.strategies.values());
  }

  getCompatibleStrategies(file: File): ProcessingStrategy[] {
    return this.getAll().filter(
      (strategy) => !strategy.validateFile || strategy.validateFile(file)
    );
  }
}
