import { AxiosResponse } from "axios";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import { APICallService } from "../../scripts/Network/APICallService";
import { IMLService } from "./IMLService";
import { Validator } from "../../scripts/validator/Validator";
import { IValidationResult } from "../../scripts/validator/IValidation";
export class OCRService implements IMLService {
  public validator: Validator;
  public api: APICallService;
  public endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.validator = new Validator();
    this.api = new APICallService(); // assuming optional config
  }

  validate(file: File): IValidationResult {
    return this.validator
      .setInput(file)
      .typeCheck("application/pdf")
      .sizeCheck(1000)
      .result();
  }
  @ValidateInput()
  public async extract(file: File): Promise<string> {
    // 2. Build FormData
    const formData = new FormData();
    formData.append("pdf", file);

    const extractedText = await this.api.uploadFile<string>(
      this.endpoint,
      formData
    );
    return extractedText;
  }
  @ValidateInput()
  public async response(file: File): Promise<AxiosResponse<Response>> {
    // 2. Build FormData
    const formData = new FormData();
    formData.append("pdf", file);

    const extractedText = await this.api.uploadFileResponse<Response>(
      this.endpoint,
      formData
    );
    return extractedText;
  }
}
