
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TimeRange = "24h" | "7d" | "30d" | "custom";

interface TimeRangeState {
  selectedRange: TimeRange;
  customStartDate: string | null;
  customEndDate: string | null;
}

const initialState: TimeRangeState = {
  selectedRange: "24h",
  customStartDate: null,
  customEndDate: null,
};

const timeRangeSlice = createSlice({
  name: "timeRange",
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<TimeRange>) => {
      state.selectedRange = action.payload;
    },
    setCustomDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.customStartDate = action.payload.start;
      state.customEndDate = action.payload.end;
    },
  },
});

export const { setTimeRange, setCustomDateRange } = timeRangeSlice.actions;
export default timeRangeSlice.reducer;
