import { APICallService } from "./APICallService";
import { Validator } from "./Validator";

export interface IMLService {
  api: APICallService;
  validator: Validator;
  validate(
    file: File | string
  ): { valid: true } | { valid: false; error: string };
}
