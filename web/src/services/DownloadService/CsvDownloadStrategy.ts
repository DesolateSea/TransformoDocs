import { IDownloadStrategy } from "./IDownloadStrategy";

export class CsvDownloadStrategy implements IDownloadStrategy {
  export(data: any[], filename: string) {
    // naive CSV conversion; you could swap in a library later
    const header = Object.keys(data[0] || {}).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
