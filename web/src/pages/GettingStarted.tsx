import { FileText, Brain, Code, Library } from "lucide-react";
import { CategoryCard } from "../components/getting-started/CategoryCard";
import { Button } from "../components/Ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../store";
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

const lightTheme = {
  textPrimary: "#111827", // gray-900
  textSecondary: "#4B5563", // gray-600
  sectionBg: "#F9FAFB", // gray-50
  cardBg: "#FFFFFF", // white
};

const darkTheme = {
  textPrimary: "#F9FAFB", // light text
  textSecondary: "#9CA3AF", // muted gray
  sectionBg: "#1F2937", // gray-800
  cardBg: "#111827", // gray-900
};

export default function GettingStarted() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className="mx-auto max-w-7xl animate-fade-in">
      <div className="mb-12 text-center">
        <h1
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: theme.textPrimary }}
        >
          Welcome to Transformodocs
        </h1>
        <p className="text-lg" style={{ color: theme.textSecondary }}>
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

      <div
        className="mt-16 rounded-xl p-8"
        style={{ backgroundColor: theme.sectionBg }}
      >
        <h2
          className="mb-6 text-2xl font-semibold"
          style={{ color: theme.textPrimary }}
        >
          Interactive Tutorial
        </h2>
        <div
          className="flex items-center justify-center rounded-lg p-12 shadow-sm"
          style={{ backgroundColor: theme.cardBg }}
        >
          <p style={{ color: theme.textSecondary }}>
            Tutorial content will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
