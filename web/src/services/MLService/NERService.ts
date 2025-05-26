import { APICallService } from "./APICallService";
import { IMLService } from "./IMLService";
import { Validator } from "./Validator";
import { Entity, NERResponse } from "../../types/NERResponse";
import { ValidateInput } from "../../scripts/Decorator/ValidateInput";
import { AxiosResponse } from "axios";
export class NERService implements IMLService {
  public api: APICallService;
  public validator: Validator;
  public endpoint: string;
  constructor(endpoint: string) {
    this.validator = new Validator();
    this.api = new APICallService();
    this.endpoint = endpoint;
  }
  validate(file: string): { valid: true } | { valid: false; error: string } {
    const validity = this.validator.setInput(file).sizeCheck(1000).result();
    if (validity.valid) {
      if (typeof file === "string") return validity;
      else {
        return { valid: false, error: "Invalid datatype" };
      }
    }
    return validity;
  }
  @ValidateInput()
  async extract(text: string): Promise<Entity[]> {
    const response = await this.api.post<NERResponse>(this.endpoint, {
      text,
    });
    return response.entities;
  }
  @ValidateInput()
  async response(text: string): Promise<AxiosResponse<Response>> {
    const response = await this.api.postResponse<Response>(this.endpoint, {
      text,
    });
    return response;
  }
}
