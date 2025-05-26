export class Validator {
  private input: File | string | null = null;
  private isValid = true;
  private errorMessage: string | null = null;

  /**
   * Sets the input to be validated.
   * Resets previous state.
   */
  setInput(input: File | string): this {
    this.input = input;
    this.isValid = true;
    this.errorMessage = null;
    return this;
  }
  typeCheck(...allowedMimeTypes: string[]): this {
    if (!this.isValid || this.input === null || typeof this.input !== "object")
      return this;

    if (!allowedMimeTypes.includes(this.input.type)) {
      this.isValid = false;
      this.errorMessage = `Invalid file type: ${
        this.input.type
      }. Allowed types: ${allowedMimeTypes.join(", ")}.`;
    }

    return this;
  }

  sizeCheck(maxSizeKB: number): this {
    if (!this.isValid || this.input === null) return this;

    const maxBytes = maxSizeKB * 1024;
    let sizeBytes = 0;

    if (typeof this.input === "string") {
      sizeBytes = new Blob([this.input]).size;
    } else {
      sizeBytes = this.input.size;
    }

    if (sizeBytes > maxBytes) {
      this.isValid = false;
      this.errorMessage = `Input too large: ${(sizeBytes / 1024).toFixed(
        1
      )} KB > ${maxSizeKB} KB.`;
    }

    return this;
  }

  customCheck(
    fn: (input: File | string) => boolean,
    errorMessage: string
  ): this {
    if (!this.isValid || this.input === null) return this;

    if (!fn(this.input)) {
      this.isValid = false;
      this.errorMessage = errorMessage;
    }

    return this;
  }

  result(): { valid: true } | { valid: false; error: string } {
    return this.isValid
      ? { valid: true }
      : { valid: false, error: this.errorMessage || "Validation failed." };
  }

  throw(): void {
    if (!this.isValid) {
      throw new Error(this.errorMessage || "Validation error");
    }
  }
}
