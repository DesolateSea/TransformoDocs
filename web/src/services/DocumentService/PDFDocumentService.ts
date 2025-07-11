import { BaseDocumentService } from "./BaseDocumentService";
import { IValidationResult } from "../../scripts/validator/IValidation";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import axios from "axios";
/**
 * Service for handling PDF documents
 */
export class PDFDocumentService extends BaseDocumentService {
  /**
   * Constructor for PdfDocumentService
   */
  protected readonly endpoint: string;
  constructor(endpoint: string) {
    // PDF-specific configuration
    super(
      endpoint, // PDF-specific endpoint
      ["application/pdf"] // Supported MIME types
    );
    this.endpoint = endpoint;
  }

  /**
   * Validates a PDF file
   * @param file The PDF file to validate
   * @returns Validation result
   */
  override validate(file: File): IValidationResult {
    // First perform base validation
    const baseValidation = super.validate(file);
    if (!baseValidation.valid) {
      return baseValidation;
    }

    // PDF-specific validation can be added here
    // For example, checking PDF version, structure, etc.

    return { valid: true };
  }

  /**
   * Processes PDF content (e.g., text extraction)
   * @param file The PDF file to process
   * @returns Promise resolving to the extracted text
   */
  @ValidateInput()
  async processContent(file: File): Promise<any> {
    try {
      // Call PDF-specific API endpoint for text extraction
      const formData = new FormData();
      formData.append("file", file);
      const response = await this.api.uploadFile<any>(this.endpoint, formData, {
        "Content-Type": "multipart/form-data",
      });
      return response.id;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the document type identifier
   * @returns String identifier for PDF documents
   */
  getDocumentType(): string {
    return "pdf";
  }
}
