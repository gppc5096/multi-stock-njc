import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { calculateBrokerStats, formatNumber } from "@/lib/statisticsUtils";
import { Building2 } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      value: number;
      usdValue: number;
    };
  }[];
}

const BrokerChart = () => {
  const stocks = loadStocks();
  const brokerStats = calculateBrokerStats(stocks);
  
  const chartData = Object.entries(brokerStats).map(([name, { totalKRW, totalUSD }]) => ({
    name,
    value: totalKRW,
    usdValue: totalUSD,
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          {data.usdValue > 0 && (
            <p className="text-sm">USD: ${formatNumber(data.usdValue)}</p>
          )}
          <p className="text-sm">KRW: ₩{formatNumber(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        증권사별 자산 분포
      </h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BrokerChart;