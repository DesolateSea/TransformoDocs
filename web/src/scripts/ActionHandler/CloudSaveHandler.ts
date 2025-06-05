import {
  ActionHandler,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { Cloud } from "lucide-react";
export class CloudSaveHandler implements ActionHandler {
  readonly id = "cloudSave";
  readonly label = "Save to Cloud";
  readonly icon = Cloud;
  readonly variant = "outline" as const;

  canExecute(result: DownloadProssingResult | null): boolean {
    // For now, always disabled - can be enabled when cloud service is available
    return false;
  }

  async execute(result: DownloadProssingResult): Promise<void> {
    // Implementation for cloud save
    throw new Error("Cloud save not implemented yet");
  }
}
