export interface IValidationResultValid {
  valid: true;
}

export interface IValidationResultInvalid {
  valid: false;
  error: string;
}

export type IValidationResult =
  | IValidationResultValid
  | IValidationResultInvalid;

export interface IValidator {
  setInput(input: File | string): this;
  typeCheck(...allowedMimeTypes: string[]): this;
  sizeCheck(maxSizeKB: number): this;
  customCheck(
    fn: (input: File | string) => boolean,
    errorMessage: string
  ): this;
  result(): IValidationResult;
  throw(): void;
}
