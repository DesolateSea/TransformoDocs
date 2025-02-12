import { FileText, Brain, Code, Library } from "lucide-react";
import { CategoryCard } from "../components/getting-started/CategoryCard";
import { Button } from "../components/Ui/button";

const categories = [
  {
    title: "Document Conversions",
    description: "Convert between PDF, DOCX, and more with AI-powered accuracy",
    icon: FileText,
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
  },
  {
    title: "AI Analysis",
    description: "Extract insights with advanced machine learning models",
    icon: Brain,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
  },
  {
    title: "Developer Tools",
    description: "Integrate our API into your workflow seamlessly",
    icon: Code,
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    title: "Templates Gallery",
    description: "Start quickly with pre-built transformation flows",
    icon: Library,
    gradient: "bg-gradient-to-br from-orange-500 to-pink-600",
  },
];

export default function GettingStarted() {
  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to Transformodocs
        </h1>
        <p className="text-lg text-gray-600">
          Start your document transformation journey with our powerful tools
        </p>
      </div>

      <div className="mb-12">
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Create First Transformation
          </Button>
          <Button size="lg" variant="outline">
            Watch Tutorial
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-gray-50 p-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Interactive Tutorial
        </h2>
        <div className="flex items-center justify-center rounded-lg bg-white p-12 shadow-sm">
          <p className="text-gray-600">
            Tutorial content will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
