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
import { Download, Cloud, Code } from "lucide-react";
import { mlService } from "../../services/MLService";
import { Entity } from "../../types/NERResponse";
import DownloadAdapter from "../../services/DownloadService";
import FileUploader from "../common/FileUploader";
import ProcessingBar from "../common/ProgressBar";

export const ConversionCanvas: React.FC = () => {
  const [mode, setMode] = useState<"ocr" | "ner">("ocr");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setProcessing(true);
    setProgress(10);
    setResult(null);
    await sleep(3000);
    try {
      let extracted = "";
      if (mode === "ocr") {
        setProgress(30);
        await sleep(3000);
        extracted = await mlService.extractText(file);
        setProgress(99);
        await sleep(1500);
        setProgress(100);
        await sleep(300);
        setResult(extracted);
      } else if (mode === "ner") {
        setProgress(30);
        const nerResult: Entity[] = await mlService.extractFileInformation(
          file
        );
        setProgress(99);
        await sleep(1500);
        setProgress(100);
        await sleep(300);

        extracted = JSON.stringify(nerResult, null, 2);
        setResult(extracted);
      }
    } catch (err: any) {
      setResult(`Error: ${err.message || err}`);
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
          <FileUploader setFile={setFile} file={file}></FileUploader>
          {/* Transformation Mode Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Transformation Type
            </label>
            <Select
              value={mode}
              onValueChange={(val) => setMode(val as "ocr" | "ner")}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select transformation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ocr" className="bg-white focus:bg-slate-50">
                  Extract Data (OCR Only)
                </SelectItem>
                <SelectItem value="ner" className="bg-white focus:bg-slate-50">
                  Convert to Machine Readable Format (OCR + NER)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Processing Progress */}
          <ProcessingBar
            processing={processing}
            progress={progress}
            gradientOption="ic"
          ></ProcessingBar>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleUpload} disabled={processing}>
              Start Processing
            </Button>
            <Button
              onClick={() => {
                if (!result) return;
                const filename =
                  mode === "ocr" ? "extracted-text" : "ner-result";
                const format = mode === "ocr" ? "text" : "json";
                DownloadAdapter.download(result, filename, format);
              }}
              disabled={!result}
            >
              <Download className="h-4 w-4" /> Download
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              disabled
            >
              <Cloud className="h-4 w-4" /> Save to Cloud
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              disabled
            >
              <Code className="h-4 w-4" /> API Callback
            </Button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="p-4 mt-4 bg-gray-100 dark:bg-gray-800 rounded text-sm whitespace-pre-wrap max-h-64 overflow-auto">
              {result}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
