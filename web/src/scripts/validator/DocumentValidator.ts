import { ALLOWED_FILE_EXTENSIONS } from "../../constants/FileConfig";
import { IValidator, IValidationResult } from "./IValidation";

export class DocumentValidator implements IValidator {
  private input: File | string | null = null;
  private errors: string[] = [];

  private static readonly MIME_TYPE_REGEX = /^(application|text|image)\//;
  private static readonly MAX_FILENAME_LENGTH = 255;
  private static readonly FILENAME_REGEX = /^[\w\-. ]+$/;

  setInput(input: File | string): this {
    this.input = input;
    this.errors = [];
    return this;
  }

  typeCheck(...allowedMimeTypes: string[]): this {
    if (this.input instanceof File) {
      const type = this.input.type;
      if (!DocumentValidator.MIME_TYPE_REGEX.test(type)) {
        this.errors.push("Invalid MIME format");
      } else if (!allowedMimeTypes.includes(type)) {
        this.errors.push(
          `Invalid file type. Allowed types: ${allowedMimeTypes.join(", ")}`
        );
      }
    } else {
      this.errors.push("Type check requires a File input");
    }
    return this;
  }

  sizeCheck(maxSizeKB: number): this {
    if (this.input instanceof File) {
      const sizeKB = this.input.size / 1024;
      if (this.input.size === 0) {
        this.errors.push("File is empty");
      } else if (sizeKB > maxSizeKB) {
        this.errors.push(`File exceeds max size of ${maxSizeKB}KB`);
      }
    } else {
      this.errors.push("Size check requires a File input");
    }
    return this;
  }

  customCheck(
    fn: (input: File | string) => boolean,
    errorMessage: string
  ): this {
    if (!this.input) {
      this.errors.push("No input provided");
      return this;
    }

    const isValid = fn(this.input);
    if (!isValid) {
      this.errors.push(errorMessage);
    }

    return this;
  }

  validateFileName(): this {
    if (!(this.input instanceof File)) return this;

    const fileName = this.input.name;

    if (!fileName) {
      this.errors.push("File name is required");
    } else {
      if (fileName.length > DocumentValidator.MAX_FILENAME_LENGTH) {
        this.errors.push(
          `File name is too long. Max ${DocumentValidator.MAX_FILENAME_LENGTH} characters`
        );
      }

      if (!DocumentValidator.FILENAME_REGEX.test(fileName)) {
        this.errors.push(
          "Invalid characters in file name. Only letters, numbers, hyphens, underscores, spaces, and periods allowed"
        );
      }

      const extension = fileName.split(".").pop()?.toLowerCase();
      if (!extension || !ALLOWED_FILE_EXTENSIONS.includes(extension)) {
        this.errors.push(
          `Invalid file extension. Allowed: ${ALLOWED_FILE_EXTENSIONS.join(
            ", "
          )}`
        );
      }
    }

    return this;
  }

  sanitizeFileName(): this {
    if (this.input instanceof File) {
      const sanitized = this.input.name
        .replace(/^.*[\\/]/, "")
        .replace(/[^\w\-. ]/g, "");
      if (sanitized !== this.input.name) {
        this.errors.push("File name contains potentially unsafe characters");
      }
    }
    return this;
  }

  async checkForMaliciousContent(): Promise<this> {
    if (!(this.input instanceof File)) return this;

    try {
      const file = this.input;
      if (
        !file.type.includes("application/x-msdownload") &&
        !file.type.includes("application/x-executable")
      ) {
        const buffer = await file.arrayBuffer();
        const view = new Uint8Array(buffer);

        const signatures = [
          [0x4d, 0x5a], // MZ
          [0x7f, 0x45, 0x4c, 0x46], // ELF
          [0xca, 0xfe, 0xba, 0xbe], // Mach-O
        ];

        for (const sig of signatures) {
          if (sig.every((b, i) => view[i] === b)) {
            this.errors.push("File appears to contain executable code");
            break;
          }
        }
      }
    } catch (err) {
      this.errors.push("Error reading file content");
    }

    return this;
  }

  result(): IValidationResult {
    if (this.errors.length > 0) {
      return { valid: false, error: this.errors.join("; ") };
    }
    return { valid: true };
  }

  throw(): void {
    const res = this.result();
    if (!res.valid) {
      throw new Error(res.error);
    }
  }
}
