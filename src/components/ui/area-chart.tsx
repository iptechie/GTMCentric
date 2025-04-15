import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface AreaChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  strokeColor?: string;
  fillColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  config: ChartConfig;
  height?: number | string;
  showGrid?: boolean;
  yAxisFormatter?: (value: number) => string;
  xAxisFormatter?: (value: string) => string;
  tooltipFormatter?: (value: number, name: string) => React.ReactNode;
}

export function AreaChart({
  data,
  dataKey,
  xAxisKey = "name",
  strokeColor = "var(--color-primary)",
  fillColor,
  gradientFrom = "rgba(59, 130, 246, 0.5)",
  gradientTo = "rgba(59, 130, 246, 0)",
  className,
  config,
  height = 300,
  showGrid = true,
  yAxisFormatter,
  xAxisFormatter,
  tooltipFormatter,
}: AreaChartProps) {
  const id = React.useId();

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient
              id={`colorGradient-${id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientTo} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisFormatter}
            className="text-xs fill-muted-foreground"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={yAxisFormatter}
            className="text-xs fill-muted-foreground"
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                formatter={tooltipFormatter}
              />
            }
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor || `var(--color-${dataKey})`}
            strokeWidth={2}
            fillOpacity={1}
            fill={fillColor || `url(#colorGradient-${id})`}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
