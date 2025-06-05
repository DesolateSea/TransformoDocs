/**
 * Core NLP service implementation.
 */

import { NLPServiceConfig } from "./config";
import {
  NLPTaskInterface,
  TaskRegistry,
  ProcessResult,
  TaskOptions,
  ServiceError,
} from "./types";

export class NLPService {
  private config: NLPServiceConfig;
  private tasks: TaskRegistry = new Map();

  constructor(config?: NLPServiceConfig) {
    this.config = config || new NLPServiceConfig();
  }

  /**
   * Register a new NLP task
   * @param name Task name
   * @param task Task implementation
   */
  public registerTask(name: string, task: NLPTaskInterface): void {
    this.tasks.set(name, task);
  }

  /**
   * Get list of available NLP tasks
   */
  public getAvailableTasks(): string[] {
    return Array.from(this.tasks.keys());
  }

  /**
   * Process text using the specified task
   * @param taskName Name of the task to use
   * @param inputText Text to process
   * @param options Additional task-specific options
   */
  public async process(
    taskName: string,
    inputText: string,
    options?: TaskOptions
  ): Promise<ProcessResult> {
    if (!this.config.isConfigured) {
      throw this.createError(
        "ConfigurationError",
        "NLP service is not properly configured"
      );
    }

    const task = this.tasks.get(taskName);
    if (!task) {
      throw this.createError(
        "TaskNotFoundError",
        `Task not found: ${taskName}`
      );
    }

    try {
      return await task.process(inputText, options);
    } catch (error) {
      throw this.createError(
        "ProcessingError",
        `Error processing task ${taskName}: ${error.message}`,
        error
      );
    }
  }

  /**
   * Get the current configuration
   */
  public getConfig(): NLPServiceConfig {
    return this.config;
  }

  /**
   * Create a standardized error object
   */
  private createError(
    code: string,
    message: string,
    details?: any
  ): ServiceError {
    const error: ServiceError = new Error(message);
    error.code = code;
    if (details) error.details = details;
    return error;
  }
}
