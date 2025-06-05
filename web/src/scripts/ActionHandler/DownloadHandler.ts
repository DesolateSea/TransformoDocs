import {
  ActionHandler,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { Download } from "lucide-react";
import DownloadAdapter from "../../services/DownloadService";
export class DownloadHandler implements ActionHandler {
  readonly id = "download";
  readonly label = "Download";
  readonly icon = Download;

  canExecute(result: DownloadProssingResult | null): boolean {
    return result !== null;
  }

  execute(result: DownloadProssingResult): void {
    const dataToDownload =
      result.format === "json"
        ? JSON.stringify(result.data, null, 2)
        : result.data;
    DownloadAdapter.download(dataToDownload, result.filename, result.format);
  }
}
