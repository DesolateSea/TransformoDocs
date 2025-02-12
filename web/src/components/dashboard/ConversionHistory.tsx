import { Card, CardContent, CardHeader, CardTitle } from "../Ui/card";
import { ScrollArea } from "../Ui/scroll-area";
import { Badge } from "../Ui/badge";
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Image,
  FileArchive,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../Ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../Ui/collapsible";

const conversions = [
  {
    id: 1,
    name: "Financial_Report.pdf",
    status: "completed",
    time: "2 minutes ago",
    type: "PDF",
    size: "2.4 MB",
    preview: "https://example.com/preview/1",
    downloadUrl: "https://example.com/download/1",
    details: {
      pages: 12,
      quality: "High",
      outputFormat: "DOCX",
      processedDate: "2024-02-10 15:30:22",
    },
  },
  {
    id: 2,
    name: "Product_Image.jpg",
    status: "processing",
    time: "5 minutes ago",
    type: "IMG",
    size: "1.1 MB",
    preview: null,
    downloadUrl: null,
    details: {
      resolution: "1920x1080",
      quality: "Medium",
      outputFormat: "PNG",
      processedDate: "2024-02-10 15:28:45",
    },
  },
  {
    id: 3,
    name: "Contract_Draft.docx",
    status: "completed",
    time: "10 minutes ago",
    type: "DOCX",
    size: "892 KB",
    preview: "https://example.com/preview/3",
    downloadUrl: "https://example.com/download/3",
    details: {
      pages: 5,
      quality: "High",
      outputFormat: "PDF",
      processedDate: "2024-02-10 15:25:10",
    },
  },
];

export const ConversionHistory = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "IMG":
        return <Image className="h-4 w-4" />;
      case "DOCX":
        return <FileArchive className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {conversions.map((item) => (
              <Collapsible
                key={item.id}
                open={expandedItems.includes(item.id)}
                onOpenChange={() => toggleItem(item.id)}
              >
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between space-x-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            {getIcon(item.type)}
                            <p className="font-medium">{item.name}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "processing"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                          {item.size}
                        </span>
                        {expandedItems.includes(item.id) ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Output Format</p>
                          <p className="text-muted-foreground">
                            {item.details.outputFormat}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Quality</p>
                          <p className="text-muted-foreground">
                            {item.details.quality}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Processed Date</p>
                          <p className="text-muted-foreground">
                            {item.details.processedDate}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Pages/Resolution</p>
                          <p className="text-muted-foreground">
                            {item.details.pages || item.details.resolution}
                          </p>
                        </div>
                      </div>
                      {item.status === "completed" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={item.preview || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Preview
                            </a>
                          </Button>
                          <Button size="sm" asChild>
                            <a href={item.downloadUrl || "#"} download>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
