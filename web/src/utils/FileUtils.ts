import { FILE_TYPE_CATEGORIES, FILE_CATEGORIES } from "../constants/FileConfig";

export class FileUtils {
  /**
   * Gets the file category based on MIME type
   * @param mimeType The MIME type of the file
   * @returns The category of the file or undefined if not recognized
   */
  static getFileCategory(
    mimeType: string
  ): (typeof FILE_CATEGORIES)[keyof typeof FILE_CATEGORIES] | undefined {
    return FILE_TYPE_CATEGORIES[mimeType];
  }

  /**
   * Converts bytes to human readable format
   * @param bytes Number of bytes
   * @param decimals Number of decimal places
   * @returns Formatted string (e.g., "1.5 MB")
   */
  static formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  /**
   * Extracts file extension from filename
   * @param fileName The name of the file
   * @returns The file extension in lowercase
   */
  static getFileExtension(fileName: string): string {
    return fileName.split(".").pop()?.toLowerCase() || "";
  }

  /**
   * Checks if a file is an image
   * @param file The file to check
   * @returns boolean indicating if the file is an image
   */
  static isImage(file: File): boolean {
    return this.getFileCategory(file.type) === FILE_CATEGORIES.IMAGE;
  }

  /**
   * Checks if a file is a document
   * @param file The file to check
   * @returns boolean indicating if the file is a document
   */
  static isDocument(file: File): boolean {
    return this.getFileCategory(file.type) === FILE_CATEGORIES.DOCUMENT;
  }

  /**
   * Creates a hash of the file content
   * @param file The file to hash
   * @returns Promise resolving to the hash string
   */
  static async getFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  /**
   * Checks if an image file's dimensions are within acceptable limits
   * @param file The image file to check
   * @param maxWidth Maximum allowed width
   * @param maxHeight Maximum allowed height
   * @returns Promise<boolean>
   */
  static async checkImageDimensions(
    file: File,
    maxWidth: number = 4096,
    maxHeight: number = 4096
  ): Promise<boolean> {
    if (!this.isImage(file)) return false;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img.width <= maxWidth && img.height <= maxHeight);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Checks if a file's content matches its extension
   * @param file The file to check
   * @returns Promise<boolean>
   */
  static async validateFileSignature(file: File): Promise<boolean> {
    const buffer = await file.arrayBuffer();
    const arr = new Uint8Array(buffer);
    const ext = this.getFileExtension(file.name);

    // File signatures (magic numbers)
    const signatures: { [key: string]: number[][] } = {
      pdf: [[0x25, 0x50, 0x44, 0x46]], // %PDF
      jpg: [[0xff, 0xd8, 0xff]], // JPEG
      png: [[0x89, 0x50, 0x4e, 0x47]], // PNG
      gif: [[0x47, 0x49, 0x46, 0x38]], // GIF
      doc: [[0xd0, 0xcf, 0x11, 0xe0]], // DOC
      docx: [[0x50, 0x4b, 0x03, 0x04]], // DOCX (ZIP)
      xls: [[0xd0, 0xcf, 0x11, 0xe0]], // XLS
      xlsx: [[0x50, 0x4b, 0x03, 0x04]], // XLSX (ZIP)
    };

    if (!signatures[ext]) return true; // If we don't have a signature, assume it's valid

    return signatures[ext].some((sig) =>
      sig.every((byte, i) => arr[i] === byte)
    );
  }

  /**
   * Performs a deep scan of the file content for potential threats
   * @param file The file to scan
   * @returns Promise<boolean> indicating if the file is safe
   */
  static async deepScanFile(file: File): Promise<boolean> {
    try {
      // 1. Validate file signature
      const validSignature = await this.validateFileSignature(file);
      if (!validSignature) return false;

      // 2. For images, check dimensions
      if (this.isImage(file)) {
        const validDimensions = await this.checkImageDimensions(file);
        if (!validDimensions) return false;
      }

      // 3. Check for embedded scripts or macros in documents
      if (this.isDocument(file)) {
        const buffer = await file.arrayBuffer();
        const content = new Uint8Array(buffer);

        // Check for common script/macro indicators
        const suspiciousPatterns = [
          [0x3c, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], // <script
          [0x3c, 0x69, 0x66, 0x72, 0x61, 0x6d, 0x65], // <iframe
          [0x56, 0x42, 0x41], // VBA
        ];

        for (const pattern of suspiciousPatterns) {
          for (let i = 0; i < content.length - pattern.length; i++) {
            if (pattern.every((byte, j) => content[i + j] === byte)) {
              return false;
            }
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Error during deep scan:", error);
      return false;
    }
  }
}
