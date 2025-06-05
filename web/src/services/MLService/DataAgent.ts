import { IMLService } from "./IMLService";
import { Validator } from "../../scripts/validator/Validator";
import { APICallService } from "../../scripts/Network/APICallService";
import { PDFDocumentService } from "../DocumentService/PDFDocumentService";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import { IValidationResult } from "../../scripts/validator/IValidation";
import { AxiosResponse } from "axios";
import Server from "../../server.json";
import { OCRService } from "./OCRService";
export class DataAgent implements IMLService {
  public validator: Validator;
  public api: APICallService;
  public endpoint: string;
  protected readonly ocr: OCRService;
  protected readonly documentService: PDFDocumentService;

  constructor() {
    this.validator = new Validator();
    this.api = new APICallService({ timeoutMs: 100000, maxRetries: 0 });
    this.endpoint = Server.MLService.DATA_EXTRACTION;
    this.documentService = new PDFDocumentService(this.endpoint);
    this.ocr = new OCRService(Server.MLService.OCR);
  }
  validate(file: File): IValidationResult {
    return this.validator.setInput(file).typeCheck("application/pdf").result();
  }
  @ValidateInput()
  public async extract(file: File): Promise<any> {
    const object = await this.ocr.extract(file);
    const response = await this.api.post<any>(this.endpoint, {
      text: object,
    });
    console.log(response);
    return response;
  }
  @ValidateInput()
  public async response(file: File): Promise<AxiosResponse<Response>> {
    const object = await this.ocr.extract(file);
    const response = await this.api.postResponse<Response>(this.endpoint, {
      text: object,
    });
    console.log(response);
    return response;
  }
}
