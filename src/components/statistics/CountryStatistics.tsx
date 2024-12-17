import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateCountryStats, formatNumber, calculatePercentage } from "@/lib/statisticsUtils";
import { Globe } from "lucide-react";

const CountryStatistics = () => {
  const stocks = loadStocks();
  const countryTotals = calculateCountryStats(stocks);
  const totalKRW = Object.values(countryTotals).reduce((sum, { krwAmount }) => sum + krwAmount, 0);
  const totalQuantity = Object.values(countryTotals).reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary" />
        국가별 통계
      </h3>
      <Table>
        <TableHeader className="bg-[#F1F0FB] text-[#333333]">
          <TableRow>
            <TableHead>국가</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">USD 합계</TableHead>
            <TableHead className="text-right">KRW 합계</TableHead>
            <TableHead className="text-right">비중(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(countryTotals).map(([country, { krwAmount, usdAmount, quantity }]) => (
            <TableRow key={country}>
              <TableCell>{country}</TableCell>
              <TableCell className="text-right">{formatNumber(quantity)} 주</TableCell>
              <TableCell className="text-right">
                {country === 'USD' ? `$${formatNumber(usdAmount)}` : '-'}
              </TableCell>
              <TableCell className="text-right">₩{formatNumber(krwAmount)}</TableCell>
              <TableCell className="text-right">{calculatePercentage(krwAmount, totalKRW)}%</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-[#F1F0FB] font-semibold text-[#333333]">
            <TableCell>총 합계</TableCell>
            <TableCell className="text-right">{formatNumber(totalQuantity)} 주</TableCell>
            <TableCell className="text-right">-</TableCell>
            <TableCell className="text-right">₩{formatNumber(totalKRW)}</TableCell>
            <TableCell className="text-right">100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default CountryStatistics;