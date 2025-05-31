import { IValidationResult } from "./IValidation";
export interface IValidCheck {
  validate(file: File | string): IValidationResult;
}
