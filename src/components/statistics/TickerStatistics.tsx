import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateTickerStats, formatNumber, calculatePercentage } from "@/lib/statisticsUtils";
import { PieChart } from "lucide-react";

const TickerStatistics = () => {
  const stocks = loadStocks();
  const tickerStats = calculateTickerStats(stocks);
  const totalAssets = Object.values(tickerStats).reduce((sum, { krwAmount }) => sum + krwAmount, 0);
  const totalQuantity = Object.values(tickerStats).reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <PieChart className="h-5 w-5 text-primary" />
        티커별 통계
      </h3>
      <Table>
        <TableHeader className="bg-[#F1F0FB] text-[#333333]">
          <TableRow>
            <TableHead>티커</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">USD 합계</TableHead>
            <TableHead className="text-right">KRW 합계</TableHead>
            <TableHead className="text-right">비중(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(tickerStats).map(([ticker, stats]) => (
            <TableRow key={ticker}>
              <TableCell>{ticker}</TableCell>
              <TableCell>{stats.stockName}</TableCell>
              <TableCell className="text-right">{formatNumber(stats.quantity)} 주</TableCell>
              <TableCell className="text-right">
                {stats.usdAmount > 0 ? `$${formatNumber(stats.usdAmount)}` : '-'}
              </TableCell>
              <TableCell className="text-right">₩{formatNumber(stats.krwAmount)}</TableCell>
              <TableCell className="text-right">{calculatePercentage(stats.krwAmount, totalAssets)}%</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-[#F1F0FB] font-semibold text-[#333333]">
            <TableCell colSpan={2}>총 합계</TableCell>
            <TableCell className="text-right">{formatNumber(totalQuantity)} 주</TableCell>
            <TableCell className="text-right">-</TableCell>
            <TableCell className="text-right">₩{formatNumber(totalAssets)}</TableCell>
            <TableCell className="text-right">100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default TickerStatistics;