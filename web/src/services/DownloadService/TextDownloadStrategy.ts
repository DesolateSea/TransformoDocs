import { IDownloadStrategy } from "./IDownloadStrategy";

export class TextDownloadStrategy implements IDownloadStrategy {
  export(data: any, filename: string) {
    const content = typeof data === "string" ? data : String(data);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
