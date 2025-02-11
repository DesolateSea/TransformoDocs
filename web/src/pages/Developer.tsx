
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Webhook, BookOpen, GripVertical } from "lucide-react";
import { APIPlayground } from "@/components/developer/APIPlayground";
import { WebhookSection } from "@/components/developer/WebhookSection";
import { DocsSection } from "@/components/developer/DocsSection";
import { TutorialSection } from "@/components/developer/TutorialSection";

const Developer = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Developer Tools</h1>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            API Console
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="tutorial" className="flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            Interactive Tutorial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api">
          <APIPlayground />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookSection />
        </TabsContent>

        <TabsContent value="docs">
          <DocsSection />
        </TabsContent>

        <TabsContent value="tutorial">
          <TutorialSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Developer;
