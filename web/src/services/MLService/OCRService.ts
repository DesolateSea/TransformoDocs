import { AxiosResponse } from "axios";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import { APICallService } from "../../scripts/Network/APICallService";
import { IMLService } from "./IMLService";
import { Validator } from "../../scripts/validator/Validator";
import { IValidationResult } from "../../scripts/validator/IValidation";
import { PDFDocumentService } from "../DocumentService/PDFDocumentService";
import server from "../../server.json";
export class OCRService implements IMLService {
  public validator: Validator;
  public api: APICallService;
  public endpoint: string;
  protected readonly documentService: PDFDocumentService;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.validator = new Validator();
    this.api = new APICallService(); // assuming optional config
    this.documentService = new PDFDocumentService(server.Document.upload);
  }

  validate(file: File): IValidationResult {
    return this.validator.setInput(file).typeCheck("application/pdf").result();
  }
  @ValidateInput()
  public async extract(file: File): Promise<string> {
    const documentId = await this.documentService.processContent(file);
    const extractedText = await this.api.post<string>(this.endpoint, {
      documentId,
    });
    return extractedText;
  }
  @ValidateInput()
  public async response(file: File): Promise<AxiosResponse<Response>> {
    const documentId = await this.documentService.processContent(file);
    const response = await this.api.postResponse<Response>(this.endpoint, {
      documentId,
    });
    return response;
  }
}
