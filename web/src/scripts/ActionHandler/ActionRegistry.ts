import { ActionHandler } from "../../types/ProcessingTypes";
import { DownloadProssingResult } from "../../types/ProcessingTypes";
export class ActionHandlerRegistry {
  private handlers = new Map<string, ActionHandler>();

  register(handler: ActionHandler): void {
    this.handlers.set(handler.id, handler);
  }

  getAll(): ActionHandler[] {
    return Array.from(this.handlers.values());
  }

  getAvailableActions(result: DownloadProssingResult | null): ActionHandler[] {
    return this.getAll().filter((handler) => handler.canExecute(result));
  }
}
