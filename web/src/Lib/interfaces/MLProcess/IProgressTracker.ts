export interface IProgressTracker {
  updateProgress(progress: number): void;
  setProcessing(processing: boolean): void;
  reset(): void;
}
