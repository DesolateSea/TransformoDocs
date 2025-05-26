import { IDownloadStrategy } from "./IDownloadStrategy";

export class DownloadAdapter {
  private static strategies: Map<string, IDownloadStrategy> = new Map();

  static registerStrategy(format: string, strategy: IDownloadStrategy) {
    this.strategies.set(format.toLowerCase(), strategy);
  }
  static download(data: any, filename: string, format: string) {
    const key = format.toLowerCase();
    const strategy = this.strategies.get(key);
    if (!strategy) {
      throw new Error(`No download strategy registered for format "${format}"`);
    }
    strategy.export(data, filename);
  }
}
