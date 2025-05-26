import { DownloadAdapter } from "./DownloadService/DownloadAdaptor";
import { JsonDownloadStrategy } from "./DownloadService/JsonDownloadStrategy";
import { TextDownloadStrategy } from "./DownloadService/TextDownloadStrategy";
import { CsvDownloadStrategy } from "./DownloadService/CsvDownloadStrategy";

// Register defaults
DownloadAdapter.registerStrategy("json", new JsonDownloadStrategy());
DownloadAdapter.registerStrategy("text", new TextDownloadStrategy());
DownloadAdapter.registerStrategy("csv", new CsvDownloadStrategy());

export default DownloadAdapter;
