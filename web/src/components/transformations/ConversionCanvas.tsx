import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Button } from "../Ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Ui/select";
import FileUploader from "../common/FileUploader";
import ProcessingBar from "../common/ProgressBar";
import { OCRStrategy } from "../../scripts/ProcessingStrategy/OCRStrategy";
import { NERStrategy } from "../../scripts/ProcessingStrategy/NERStrategy";
import { DataExtractorStrategy } from "../../scripts/ProcessingStrategy/DataExtractorStrategy";
import {
  ActionHandler,
  DownloadProssingResult,
} from "../../types/ProcessingTypes";
import { DownloadHandler } from "../../scripts/ActionHandler/DownloadHandler";
import { CloudSaveHandler } from "../../scripts/ActionHandler/CloudSaveHandler";
import { APICallbackHandler } from "../../scripts/ActionHandler/APICallbackHandler";
import { ProcessingStrategyRegistry } from "../../scripts/ActionHandler/ProcessingStrategyRegistry";
import { ActionHandlerRegistry } from "../../scripts/ActionHandler/ActionRegistry";
import { ProcessingEngine } from "../../services/ProcessingEngine";
export const ConversionCanvas: React.FC = () => {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>("ocr");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<DownloadProssingResult | null>(null);

  // Initialize registries
  const strategyRegistry = React.useMemo(() => {
    const registry = new ProcessingStrategyRegistry();
    registry.register(new OCRStrategy());
    registry.register(new NERStrategy());
    registry.register(new DataExtractorStrategy());
    return registry;
  }, []);

  const actionRegistry = React.useMemo(() => {
    const registry = new ActionHandlerRegistry();
    registry.register(new DownloadHandler());
    registry.register(new CloudSaveHandler());
    registry.register(new APICallbackHandler());
    return registry;
  }, []);

  const processingEngine = React.useMemo(
    () => new ProcessingEngine(strategyRegistry, setProgress),
    [strategyRegistry]
  );

  const availableStrategies = React.useMemo(() => {
    return file
      ? strategyRegistry.getCompatibleStrategies(file)
      : strategyRegistry.getAll();
  }, [file, strategyRegistry]);

  const availableActions = React.useMemo(
    () => actionRegistry.getAvailableActions(result),
    [result, actionRegistry]
  );

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setProcessing(true);
    setProgress(0);
    setResult(null);

    try {
      const processedResult = await processingEngine.process(
        file,
        selectedStrategyId
      );
      setResult(processedResult);
    } catch (err: any) {
      setResult({
        data: `Error: ${err.message || err}`,
        format: "text",
        filename: "error",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleAction = async (handler: ActionHandler) => {
    if (!result) return;

    try {
      await handler.execute(result, file);
    } catch (err: any) {
      alert(`Action failed: ${err.message}`);
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Document Transformation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File Upload Section */}
          <FileUploader setFile={setFile} file={file} />

          {/* Transformation Mode Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transformation Type
            </label>
            <Select
              value={selectedStrategyId}
              onValueChange={setSelectedStrategyId}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select transformation type" />
              </SelectTrigger>
              <SelectContent>
                {availableStrategies.map((strategy) => (
                  <SelectItem
                    key={strategy.id}
                    value={strategy.id}
                    className="bg-white focus:bg-slate-50"
                  >
                    {strategy.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Processing Progress */}
          <ProcessingBar
            processing={processing}
            progress={progress}
            gradientOption="ic"
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleUpload} disabled={processing}>
              Start Processing
            </Button>

            {availableActions.map((handler) => {
              const IconComponent = handler.icon;
              return (
                <Button
                  key={handler.id}
                  variant={handler.variant || "default"}
                  className="flex items-center gap-2"
                  onClick={() => handleAction(handler)}
                  disabled={!handler.canExecute(result)}
                >
                  <IconComponent className="h-4 w-4" />
                  {handler.label}
                </Button>
              );
            })}
          </div>

          {/* Result Display */}
          {result && (
            <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded text-sm whitespace-pre-wrap max-h-64 overflow-auto">
              {typeof result.data === "string"
                ? result.data
                : JSON.stringify(result.data, null, 2)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
