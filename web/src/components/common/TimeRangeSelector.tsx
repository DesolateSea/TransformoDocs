
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTimeRange, setCustomDateRange } from "@/store/timeRangeSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const TimeRangeSelector = () => {
  const dispatch = useDispatch();
  const { selectedRange, customStartDate, customEndDate } = useSelector(
    (state: RootState) => state.timeRange
  );

  return (
    <div className="flex gap-2">
      <Button
        variant={selectedRange === "24h" ? "default" : "outline"}
        onClick={() => dispatch(setTimeRange("24h"))}
      >
        Last 24 hours
      </Button>
      <Button
        variant={selectedRange === "7d" ? "default" : "outline"}
        onClick={() => dispatch(setTimeRange("7d"))}
      >
        Last 7 days
      </Button>
      <Button
        variant={selectedRange === "30d" ? "default" : "outline"}
        onClick={() => dispatch(setTimeRange("30d"))}
      >
        Last 30 days
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={selectedRange === "custom" ? "default" : "outline"}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Custom range
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{
              from: customStartDate ? new Date(customStartDate) : undefined,
              to: customEndDate ? new Date(customEndDate) : undefined,
            }}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                dispatch(setTimeRange("custom"));
                dispatch(
                  setCustomDateRange({
                    start: format(range.from, "yyyy-MM-dd"),
                    end: format(range.to, "yyyy-MM-dd"),
                  })
                );
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
