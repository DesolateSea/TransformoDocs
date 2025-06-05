export interface ProcessingResult {
  data: any;
  status: number;
  output?: string;
}

export interface ProcessingState {
  file: File | null;
  result: string | null;
  responseMsg: string | null;
  progress: number;
  processing: boolean;
  previewUrl: string | null;
  textPreview: string | null;
}

export type ProcessingMode = "ocr" | "ner" | "dataExtractor";
// Types and Interfaces
export interface DownloadProssingResult {
  data: any;
  format: "text" | "json";
  filename: string;
}

export interface ProcessingStrategy {
  readonly id: string;
  readonly displayName: string;
  readonly description?: string;
  process(file: File): Promise<DownloadProssingResult>;
  validateFile?(file: File): boolean;
}

export interface ActionHandler {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly variant?: "default" | "outline";
  canExecute(result: DownloadProssingResult | null): boolean;
  execute(
    result: DownloadProssingResult,
    file: File | null
  ): Promise<void> | void;
}
