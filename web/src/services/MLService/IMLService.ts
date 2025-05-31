import { APICallService } from "../../scripts/Network/APICallService";
import { Validator } from "../../scripts/validator/Validator";
import { IValidationResult } from "../../scripts/validator/IValidation";
import { IValidCheck } from "../../scripts/validator/IValidCheck";
export interface IMLService extends IValidCheck {
  api: APICallService;
  validator: Validator;
  validate(file: File | string): IValidationResult;
}
