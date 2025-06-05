import { IValidationResult } from "../../../scripts/validator/IValidation";
import { IValidCheck } from "../../../scripts/validator/IValidCheck";
/**
 * Interface for document service implementations
 * Defines the contract for all document type handlers
 */
export interface IDocumentService extends IValidCheck {
  /**
   * Validates a document before processing
   * @param file The file to validate
   * @returns Validation result object
   */
  validate(file: File): IValidationResult;

  /**
   * Uploads a document to the server
   * @param file The file to upload
   * @returns Promise resolving to the response data
   */
  upload(file: File): Promise<any>;

  /**
   * Gets the supported file types for this document service
   * @returns Array of supported MIME types
   */
  getSupportedTypes(): string[];

  /**
   * Processes the document content
   * @param file The file to process
   * @returns Promise resolving to the processed content
   */
  processContent?(file: File): Promise<any>;
}
