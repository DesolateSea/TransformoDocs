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

export type ProcessingMode = "ocr" | "ner";
