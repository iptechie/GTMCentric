import React from "react";
import { MetricAreaChart } from "@/components/MetricAreaChart";

export default function AreaChartDemo() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Area Chart Visualization</h1>
        <p className="text-slate-600">
          Interactive area charts for GTM metrics visualization with time range
          selection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Generation Chart */}
        <MetricAreaChart
          title="Lead Generation"
          description="Monitor your lead generation performance over time"
          dataKey="value"
          changeValue={23.5}
          gradientFrom="rgba(59, 130, 246, 0.5)"
          gradientTo="rgba(59, 130, 246, 0.05)"
          strokeColor="#3b82f6"
        />

        {/* Conversion Rate Chart */}
        <MetricAreaChart
          title="Conversion Rate"
          description="Track your lead-to-customer conversion rate"
          dataKey="conversions"
          changeValue={15.8}
          gradientFrom="rgba(16, 185, 129, 0.5)"
          gradientTo="rgba(16, 185, 129, 0.05)"
          strokeColor="#10b981"
        />

        {/* Website Traffic Chart */}
        <MetricAreaChart
          title="Website Traffic"
          description="Monitor website visits from marketing campaigns"
          dataKey="leads"
          timeRange="weekly"
          changeValue={-5.3}
          gradientFrom="rgba(139, 92, 246, 0.5)"
          gradientTo="rgba(139, 92, 246, 0.05)"
          strokeColor="#8b5cf6"
        />

        {/* Revenue Chart */}
        <MetricAreaChart
          title="Revenue Trend"
          description="Track revenue from GTM activities"
          dataKey="value"
          timeRange="daily"
          changeValue={12.7}
          gradientFrom="rgba(249, 115, 22, 0.5)"
          gradientTo="rgba(249, 115, 22, 0.05)"
          strokeColor="#f97316"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Custom Configurations</h2>
        <div className="grid grid-cols-1 gap-6">
          {/* Full width with multiple time ranges */}
          <MetricAreaChart
            title="Campaign Performance"
            description="Comprehensive view of all marketing campaign metrics"
            dataKey="value"
            timeRange="monthly"
            height={300}
            gradientFrom="rgba(14, 165, 233, 0.5)"
            gradientTo="rgba(14, 165, 233, 0.05)"
            strokeColor="#0ea5e9"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Small charts without time selectors */}
        <MetricAreaChart
          title="Email CTR"
          dataKey="conversions"
          timeRange="weekly"
          showTimeRangeSelector={false}
          height={180}
          gradientFrom="rgba(236, 72, 153, 0.5)"
          gradientTo="rgba(236, 72, 153, 0.05)"
          strokeColor="#ec4899"
        />

        <MetricAreaChart
          title="Social Engagement"
          dataKey="leads"
          timeRange="weekly"
          showTimeRangeSelector={false}
          height={180}
          gradientFrom="rgba(234, 88, 12, 0.5)"
          gradientTo="rgba(234, 88, 12, 0.05)"
          strokeColor="#ea580c"
        />

        <MetricAreaChart
          title="Ad Impressions"
          dataKey="value"
          timeRange="weekly"
          showTimeRangeSelector={false}
          height={180}
          gradientFrom="rgba(168, 85, 247, 0.5)"
          gradientTo="rgba(168, 85, 247, 0.05)"
          strokeColor="#a855f7"
        />
      </div>
    </div>
  );
}
