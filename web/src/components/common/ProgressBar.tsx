import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const gradientOptions: Record<string, string> = {
  rw: "bg-gradient-to-r from-red-500 to-white",
  rp: "bg-gradient-to-r from-blue-500 to-purple-500",
  gy: "bg-gradient-to-r from-green-500 to-yellow-300",
  po: "bg-gradient-to-r from-pink-400 to-orange-400",
  ic: "bg-gradient-to-r from-indigo-600 to-cyan-400",
};

const defaultGradient = "bg-gradient-to-r from-gray-500 to-gray-300";

interface ProcessingBarProps {
  processing: boolean;
  progress: number;
  gradientOption: string;
}

const ProcessingBar: React.FC<ProcessingBarProps> = ({
  processing,
  progress,
  gradientOption,
}) => {
  const [showComplete, setShowComplete] = useState(false);
  const gradientClass = gradientOptions[gradientOption] ?? defaultGradient;

  useEffect(() => {
    if (progress === 100) {
      setShowComplete(true);
    } else {
      setShowComplete(false);
    }
  }, [progress]);

  // Always show bar if processing or showComplete
  const shouldShow = processing || showComplete || progress > 0;

  if (!shouldShow) return null;

  return (
    <div className="space-y-2 transition-opacity duration-500">
      {!showComplete ? (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 dark:text-gray-300">
              Processing...
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {progress}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full ${gradientClass} transition-all duration-500 ease-in-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-2 text-green-600 font-medium">
          <CheckCircle className="w-5 h-5" />
          <span>Completed</span>
        </div>
      )}
    </div>
  );
};

export default ProcessingBar;
