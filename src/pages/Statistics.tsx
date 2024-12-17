import { ListFilter, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CountryStatistics from "@/components/statistics/CountryStatistics";
import BrokerStatistics from "@/components/statistics/BrokerStatistics";
import TickerStatistics from "@/components/statistics/TickerStatistics";
import BrokerChart from "@/components/statistics/BrokerChart";
import TickerChart from "@/components/statistics/TickerChart";

const Statistics = () => {
  return (
    <div className="container py-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <ListFilter className="h-6 w-6 text-primary" />
          리스트 통계
        </h2>
        <div className="grid gap-4">
          <CountryStatistics />
          <BrokerStatistics />
          <TickerStatistics />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <PieChart className="h-6 w-6 text-primary" />
          차트 통계
        </h2>
        <div className="grid gap-4">
          <BrokerChart />
          <TickerChart />
        </div>
      </div>
    </div>
  );
};

export default Statistics;