import React, { useState } from "react";
import { AreaChart } from "@/components/ui/area-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChartConfig } from "@/components/ui/chart";

const SAMPLE_DATA = {
  monthly: [
    { month: "Jan", value: 120, leads: 40, conversions: 10 },
    { month: "Feb", value: 150, leads: 50, conversions: 15 },
    { month: "Mar", value: 180, leads: 55, conversions: 18 },
    { month: "Apr", value: 200, leads: 65, conversions: 22 },
    { month: "May", value: 250, leads: 80, conversions: 30 },
    { month: "Jun", value: 280, leads: 85, conversions: 35 },
  ],
  weekly: [
    { week: "W1", value: 42, leads: 12, conversions: 4 },
    { week: "W2", value: 48, leads: 15, conversions: 5 },
    { week: "W3", value: 52, leads: 18, conversions: 6 },
    { week: "W4", value: 60, leads: 20, conversions: 7 },
    { week: "W5", value: 68, leads: 22, conversions: 9 },
    { week: "W6", value: 75, leads: 25, conversions: 11 },
  ],
  daily: [
    { day: "Mon", value: 10, leads: 4, conversions: 1 },
    { day: "Tue", value: 12, leads: 5, conversions: 2 },
    { day: "Wed", value: 15, leads: 6, conversions: 2 },
    { day: "Thu", value: 18, leads: 7, conversions: 3 },
    { day: "Fri", value: 20, leads: 8, conversions: 3 },
    { day: "Sat", value: 15, leads: 5, conversions: 2 },
    { day: "Sun", value: 8, leads: 3, conversions: 1 },
  ],
};

type TimeRange = "daily" | "weekly" | "monthly";
type DataKey = "value" | "leads" | "conversions";

interface MetricAreaChartProps {
  title: string;
  description?: string;
  dataKey?: DataKey;
  timeRange?: TimeRange;
  showTimeRangeSelector?: boolean;
  height?: number | string;
  className?: string;
  showChange?: boolean;
  changeValue?: number;
  gradientFrom?: string;
  gradientTo?: string;
  strokeColor?: string;
}

export function MetricAreaChart({
  title,
  description,
  dataKey = "value",
  timeRange: initialTimeRange = "monthly",
  showTimeRangeSelector = true,
  height = 250,
  className,
  showChange = true,
  changeValue = 18.2,
  gradientFrom = "rgba(59, 130, 246, 0.5)",
  gradientTo = "rgba(59, 130, 246, 0)",
  strokeColor = "hsl(var(--chart-1))",
}: MetricAreaChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  // Time range selectors
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Chart data based on selected time range
  const data = SAMPLE_DATA[timeRange];

  // X-axis key based on time range
  const xAxisKey =
    timeRange === "daily" ? "day" : timeRange === "weekly" ? "week" : "month";

  // Chart configuration
  const chartConfig: ChartConfig = {
    [dataKey]: {
      label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
      color: strokeColor,
    },
  };

  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {showChange && (
            <div
              className={cn(
                "flex items-center px-2 py-1 rounded-md text-sm font-medium",
                changeValue >= 0
                  ? "text-green-600 bg-green-50/60"
                  : "text-red-600 bg-red-50/60"
              )}
            >
              {changeValue >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(changeValue)}%
            </div>
          )}
        </div>

        {showTimeRangeSelector && (
          <div className="flex mt-2 space-x-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range.value)}
                className="text-xs h-7"
              >
                {range.label}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <AreaChart
          data={data}
          dataKey={dataKey}
          xAxisKey={xAxisKey}
          config={chartConfig}
          height={height}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
          strokeColor={strokeColor}
          yAxisFormatter={(value) => `${value}`}
        />

        <div className="mt-2 text-sm text-muted-foreground">
          {timeRange === "monthly"
            ? "Last 6 months"
            : timeRange === "weekly"
            ? "Last 6 weeks"
            : "Last 7 days"}
        </div>
      </CardContent>
    </Card>
  );
}
