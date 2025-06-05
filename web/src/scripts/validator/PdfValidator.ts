// import { DocumentValidator } from "./DocumentValidator";
// export class PDFValidator {
//   static async validate(file: File) {
//     const validator = new DocumentValidator()
//       .setInput(file)
//       .validateFileName()
//       .typeCheck("application/pdf")
//       .sizeCheck(1024 * 5) // 5 MB
//       .sanitizeFileName();

//     await validator.checkForMaliciousContent();
//     return validator.result();
//   }
// }
