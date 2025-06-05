/**
 * TransformoDocs Package
 * A modular interface for document processing and NLP services.
 */

export class TransformoDocs {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  /**
   * Convert PDF file to text
   * @param file PDF file to process
   * @returns Extracted text from PDF
   */
  async convertPDFToText(file: File | Blob): Promise<string> {
    throw new Error('Method will be implemented by service providers');
  }

  /**
   * Extract structured data from text using NLP
   * @param text Input text to process
   * @returns Dictionary containing extracted information
   */
  async extractData(text: string): Promise<Record<string, any>> {
    throw new Error('Method will be implemented by service providers');
  }
}

export const VERSION = '0.1.0';
