import { APICallService } from "../../scripts/Network/APICallService";
import { Validator } from "../../scripts/validator/Validator";
import { IValidationResult } from "../../scripts/validator/IValidation";
import { IDocumentService } from "../../Lib/interfaces/DocumentService/IDocumentService";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import { MAX_FILE_SIZE } from "../../constants/FileConfig";

/**
 * Base abstract class for document services
 * Implements common functionality for all document services
 */
export abstract class BaseDocumentService implements IDocumentService {
  protected api: APICallService;
  protected validator: Validator;
  protected endpoint: string;
  protected supportedTypes: string[];
  protected maxSizeKB: number;

  /**
   * Creates a new document service instance
   * @param endpoint API endpoint for this document type
   * @param supportedTypes Array of supported MIME types
   * @param maxSizeKB Maximum file size in KB (defaults to MAX_FILE_SIZE)
   */
  constructor(
    endpoint: string,
    supportedTypes: string[],
    maxSizeKB: number = MAX_FILE_SIZE / 1024
  ) {
    this.validator = new Validator();
    this.api = new APICallService();
    this.endpoint = endpoint;
    this.supportedTypes = supportedTypes;
    this.maxSizeKB = maxSizeKB;
  }

  /**
   * Validates a file based on type and size
   * @param file The file to validate
   * @returns Validation result
   */
  validate(file: File): IValidationResult {
    return this.validator
      .setInput(file)
      .typeCheck(...this.supportedTypes)
      .sizeCheck(this.maxSizeKB)
      .result();
  }

  /**
   * Gets the supported MIME types for this service
   * @returns Array of supported MIME types
   */
  getSupportedTypes(): string[] {
    return this.supportedTypes;
  }

  /**
   * Uploads a file to the server
   * @param file The file to upload
   * @returns Promise resolving to the server response
   */
  @ValidateInput()
  async upload(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", this.getDocumentType());

    return this.api.uploadFile(this.endpoint, formData);
  }

  /**
   * Gets the document type identifier
   * @returns String identifier for this document type
   */
  protected abstract getDocumentType(): string;

  /**
   * Optional method to process document content
   * @param file The file to process
   */
  async processContent?(file: File): Promise<any>;
}
