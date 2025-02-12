import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { FileText, Award, Image } from "lucide-react";

const presets = [
  {
    title: "Legal Doc Redactor",
    icon: FileText,
    description: "Automatically redact sensitive information",
  },
  {
    title: "Certificate Normalizer",
    icon: Award,
    description: "Standardize certificate formats",
  },
  {
    title: "Bulk Image OCR",
    icon: Image,
    description: "Extract text from multiple images",
  },
];

export const PresetLibrary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Presets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {presets.map((preset) => (
            <button
              key={preset.title}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <preset.icon className="h-5 w-5 mt-0.5 text-blue-500" />
              <div>
                <h3 className="font-medium">{preset.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {preset.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
