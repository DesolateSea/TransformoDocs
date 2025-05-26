import { IDownloadStrategy } from "./IDownloadStrategy";

export class JsonDownloadStrategy implements IDownloadStrategy {
  export(data: any, filename: string) {
    let jsonData;

    // If input is a string, try to parse it first
    try {
      jsonData = typeof data === "string" ? JSON.parse(data) : data;
    } catch (error) {
      console.error(
        "Invalid JSON string passed to JsonDownloadStrategy.export:",
        error
      );
      return;
    }

    const content = JSON.stringify(jsonData, null, 2); // pretty print
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".json") ? filename : `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
