import {
  ActionHandler,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { Code } from "lucide-react";

export class APICallbackHandler implements ActionHandler {
  readonly id = "apiCallback";
  readonly label = "API Callback";
  readonly icon = Code;
  readonly variant = "outline" as const;

  canExecute(result: DownloadProssingResult | null): boolean {
    // For now, always disabled - can be enabled when API is configured
    return false;
  }

  async execute(result: DownloadProssingResult): Promise<void> {
    // Implementation for API callback
    throw new Error("API callback not implemented yet");
  }
}
