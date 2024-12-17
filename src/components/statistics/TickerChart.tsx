import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { calculateTickerStats, formatNumber } from "@/lib/statisticsUtils";
import { LineChart } from "lucide-react";

interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      ticker: string;
      value: number;
      quantity: number;
      usdValue: number;
    };
  }[];
  label?: string;
}

const TickerChart = () => {
  const stocks = loadStocks();
  const tickerStats = calculateTickerStats(stocks);
  
  const chartData = Object.entries(tickerStats).map(([ticker, stats]) => ({
    ticker,
    name: stats.stockName,
    value: stats.krwAmount,
    quantity: stats.quantity,
    usdValue: stats.usdAmount,
  }));

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-sm">티커: {label}</p>
          <p className="text-sm">수량: {formatNumber(payload[0].payload.quantity)}</p>
          {payload[0].payload.usdValue > 0 && (
            <p className="text-sm">USD: ${formatNumber(payload[0].payload.usdValue)}</p>
          )}
          <p className="text-sm">KRW: ₩{formatNumber(payload[0].payload.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <LineChart className="h-5 w-5 text-primary" />
        티커별 자산 분포
      </h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ticker" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="자산 금액" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TickerChart;