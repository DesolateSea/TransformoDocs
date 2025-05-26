export interface IDownloadStrategy {
  /**
   * Export `data` under `filename`.
   * Should handle Blob creation, object URLs, and triggering download.
   */
  export(data: any, filename: string): void;
}
