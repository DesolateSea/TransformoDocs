/**
 * NLP task implementations.
 */

import {
  NLPTaskInterface,
  ProcessResult,
  TaskOptions,
  ClassificationResult,
  NERResult,
  SentimentResult,
} from "./types";

export abstract class NLPTask implements NLPTaskInterface {
  abstract process(
    inputText: string,
    options?: TaskOptions
  ): Promise<ProcessResult>;

  protected validateInput(text: string): void {
    if (!text || typeof text !== "string") {
      throw new Error("Input text must be a non-empty string");
    }
  }
}

export class TextClassification extends NLPTask {
  async process(
    inputText: string,
    options?: TaskOptions
  ): Promise<ClassificationResult> {
    this.validateInput(inputText);
    // Implementation to be provided by service-specific classes
    throw new Error("Method not implemented");
  }
}

export class NamedEntityRecognition extends NLPTask {
  async process(inputText: string, options?: TaskOptions): Promise<NERResult> {
    this.validateInput(inputText);
    // Implementation to be provided by service-specific classes
    throw new Error("Method not implemented");
  }
}

export class SentimentAnalysis extends NLPTask {
  async process(
    inputText: string,
    options?: TaskOptions
  ): Promise<SentimentResult> {
    this.validateInput(inputText);
    // Implementation to be provided by service-specific classes
    throw new Error("Method not implemented");
  }
}

// Example of a custom task implementation
export class CustomTask extends NLPTask {
  async process(
    inputText: string,
    options?: TaskOptions
  ): Promise<ProcessResult> {
    this.validateInput(inputText);
    // Custom implementation example
    return {
      processed: true,
      text: inputText,
      options,
      timestamp: new Date().toISOString(),
    };
  }
}
