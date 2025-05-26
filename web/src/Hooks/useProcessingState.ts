// src/hooks/useProcessingState.ts
import { useState } from "react";
import type { ProcessingState } from "../types/ProcessingTypes";

export function useProcessingState() {
  const [state, setState] = useState<ProcessingState>({
    file: null,
    result: null,
    responseMsg: null,
    progress: 0,
    processing: false,
    previewUrl: null,
    textPreview: null,
  });

  const updateState = (updates: Partial<ProcessingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState({
      file: null,
      result: null,
      responseMsg: null,
      progress: 0,
      processing: false,
      previewUrl: null,
      textPreview: null,
    });
  };

  return { state, updateState, resetState };
}
