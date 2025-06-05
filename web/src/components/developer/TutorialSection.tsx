// src/components/TutorialSection.tsx
import { useState } from "react";
import FileUploader from "../common/FileUploader";
import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { Eye, Download } from "lucide-react";
import { Button } from "../Ui/button";
import ProcessingBar from "../common/ProgressBar";
import DownloadAdapter from "../../services/DownloadService";
import { ProcessorFactory } from "../../services/ProcessorFactory";
import { PreviewService } from "../../services/PreviewService";
import { useProcessingState } from "../../Hooks/useProcessingState";
import type { ProcessingMode } from "../../types/ProcessingTypes";
import { IProgressTracker } from "../../Lib/interfaces/MLProcess/IProgressTracker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Ui/select";
export function TutorialSection() {
  const { state, updateState, resetState } = useProcessingState();
  const [mode, setMode] = useState<ProcessingMode>("ocr");
  const previewService = new PreviewService();
  const serviceDescriptions = {
    ocr: "Optical Character Recognition",
    ner: "Name Entity Recognition",
    dataExtractor: "Data Extractor",
  };
  // Progress tracker implementation
  const progressTracker: IProgressTracker = {
    updateProgress: (progress: number) => updateState({ progress }),
    setProcessing: (processing: boolean) => updateState({ processing }),
    reset: () => updateState({ progress: 0, processing: false }),
  };

  const handleProcess = async () => {
    if (!state.file) {
      alert("Please upload a file");
      return;
    }

    updateState({
      processing: true,
      progress: 10,
      result: null,
      responseMsg: null,
    });

    try {
      const processor = ProcessorFactory.createProcessor(mode, progressTracker);
      const result = await processor.process(state.file);

      const formattedResult = JSON.stringify(
        { data: result.data, status: result.status },
        null,
        2
      );

      updateState({
        result: formattedResult,
        previewUrl: result.output || null,
        responseMsg: null,
      });
    } catch (err: any) {
      updateState({ result: `Error: ${err.message || err}` });
    } finally {
      setTimeout(() => {
        updateState({ processing: false, progress: 0 });
      }, 1000);
    }
  };

  const handleFileSelect = async (file: File | null) => {
    updateState({
      file,
      result: null,
      responseMsg: null,
      previewUrl: null,
      textPreview: null,
    });

    if (!file) return;

    const { url, text } = await previewService.generatePreview(file);
    updateState({ previewUrl: url, textPreview: text });
  };

  const handleDownload = () => {
    if (!state.result) return;

    DownloadAdapter.download(
      state.result,
      "extraction-result",
      mode === "ocr" ? "txt" : "json"
    );
  };

  const availableModes = ProcessorFactory.getAvailableModes();
  function previewOption(): boolean {
    return mode == "ner" || mode == "ocr";
  }
  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Interactive Tutorial</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <FileUploader setFile={handleFileSelect} file={state.file} />

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Service:
            </label>
            <Select
              value={mode}
              onValueChange={(val) =>
                setMode(val as "ocr" | "ner" | "dataExtractor")
              }
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select transformation type" />
              </SelectTrigger>
              <SelectContent>
                {availableModes.map((availableMode) => (
                  <SelectItem
                    key={availableMode}
                    value={availableMode}
                    className="bg-white focus:bg-slate-50"
                  >
                    {serviceDescriptions[availableMode]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ProcessingBar
            progress={state.progress}
            processing={state.processing}
            gradientOption="rp"
          />

          <div className="flex gap-2">
            <Button
              onClick={handleProcess}
              disabled={!state.file || state.processing}
            >
              Start Extraction
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!state.result}
              variant="outline"
            >
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base dark:text-white">
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden p-2">
                  {state.previewUrl ? (
                    previewOption() ? (
                      <iframe
                        src={state.previewUrl}
                        className="whitespace-pre-wrap text-sm overflow-auto  w-full h-full text-left"
                      ></iframe>
                    ) : (
                      <img
                        src={state.previewUrl}
                        className="whitespace-pre-wrap text-sm overflow-auto  w-full h-full text-left"
                      />
                    )
                  ) : (
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base dark:text-white">
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto max-h-64">
                  <code>
                    {state.result ||
                      JSON.stringify({ status: "waiting for file" }, null, 2)}
                  </code>
                </pre>
                {state.responseMsg && (
                  <p className="mt-2 text-xs text-gray-500">
                    Response:&nbsp;{state.responseMsg}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
