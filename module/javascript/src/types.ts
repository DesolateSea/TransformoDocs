/**
 * Type definitions for NLP service.
 */

export interface ProcessResult {
  [key: string]: any;
}

export interface TaskOptions {
  [key: string]: any;
}

export interface NLPTaskInterface {
  process(inputText: string, options?: TaskOptions): Promise<ProcessResult>;
}

export interface ServiceError extends Error {
  code?: string;
  details?: any;
}

export type TaskRegistry = Map<string, NLPTaskInterface>;

export interface ClassificationResult extends ProcessResult {
  labels: string[];
  scores: number[];
}

export interface NERResult extends ProcessResult {
  entities: Array<{
    text: string;
    type: string;
    start: number;
    end: number;
    score?: number;
  }>;
}

export interface SentimentResult extends ProcessResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  details?: {
    [key: string]: number;
  };
}

export interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}
