/**
 * Maximum file size in bytes (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Allowed MIME types for file uploads
 */
export const ALLOWED_FILE_TYPES = [
  // PDF Documents
  "application/pdf",

  // Text Documents
  "text/plain",
  "text/markdown",
  "text/csv",

  // Microsoft Office Documents
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx

  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",

  // Archives (if needed)
  // 'application/zip',
  // 'application/x-rar-compressed',
  // 'application/x-7z-compressed'
];

/**
 * Allowed file extensions (must correspond to ALLOWED_FILE_TYPES)
 */
export const ALLOWED_FILE_EXTENSIONS = [
  // Documents
  "pdf",
  "txt",
  "md",
  "csv",
  "doc",
  "docx",
  "xls",
  "xlsx",

  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",

  // Archives (if needed)
  // 'zip',
  // 'rar',
  // '7z'
];

/**
 * File categories mapping
 */
export const FILE_CATEGORIES = {
  DOCUMENT: "document",
  IMAGE: "image",
  ARCHIVE: "archive",
} as const;

/**
 * File type to category mapping
 */
export const FILE_TYPE_CATEGORIES: {
  [key: string]: (typeof FILE_CATEGORIES)[keyof typeof FILE_CATEGORIES];
} = {
  "application/pdf": FILE_CATEGORIES.DOCUMENT,
  "text/plain": FILE_CATEGORIES.DOCUMENT,
  "text/markdown": FILE_CATEGORIES.DOCUMENT,
  "text/csv": FILE_CATEGORIES.DOCUMENT,
  "application/msword": FILE_CATEGORIES.DOCUMENT,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    FILE_CATEGORIES.DOCUMENT,
  "application/vnd.ms-excel": FILE_CATEGORIES.DOCUMENT,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    FILE_CATEGORIES.DOCUMENT,
  "image/jpeg": FILE_CATEGORIES.IMAGE,
  "image/png": FILE_CATEGORIES.IMAGE,
  "image/gif": FILE_CATEGORIES.IMAGE,
  "image/webp": FILE_CATEGORIES.IMAGE,
  "image/svg+xml": FILE_CATEGORIES.IMAGE,
  // 'application/zip': FILE_CATEGORIES.ARCHIVE,
  // 'application/x-rar-compressed': FILE_CATEGORIES.ARCHIVE,
  // 'application/x-7z-compressed': FILE_CATEGORIES.ARCHIVE
};
