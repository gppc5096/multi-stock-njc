import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadStocks, saveStock } from "@/lib/stockStorage";
import * as XLSX from 'xlsx';
import { StockTransaction } from "@/types/stock";

// Excel 데이터를 위한 인터페이스 추가
interface ExcelStockData {
  id?: string;
  date: string;
  type: 'buy' | 'sell';
  country: 'KRW' | 'USD';
  broker: string;
  stockName: string;
  ticker: string;
  quantity: number | string;
  exchangeRate: number | string;
  price: number | string;
  usdAmount: number | string;
  krwAmount: number | string;
}

const StockDataManagement = () => {
  const { toast } = useToast();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as ExcelStockData[];
      
      const processedData = jsonData.map((item: ExcelStockData) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
        quantity: Number(item.quantity) || 0,
        exchangeRate: Number(item.exchangeRate) || 0,
        price: Number(item.price) || 0,
        usdAmount: Number(item.usdAmount) || 0,
        krwAmount: Number(item.krwAmount) || 0,
      })) as StockTransaction[];
      
      // localStorage에 데이터 저장
      localStorage.setItem('stocks', JSON.stringify(processedData));
      
      // 데이터 변경 이벤트 발생
      window.dispatchEvent(new Event('stocksChanged'));
      
      toast({
        title: "가져오기 성공",
        description: "주식 데이터를 성공적으로 가져왔습니다.",
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "가져오기 실패",
        description: "파일을 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
    e.target.value = '';
  };

  const handleExport = () => {
    try {
      const stocks = loadStocks();
      const worksheet = XLSX.utils.json_to_sheet(stocks);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stocks");
      
      XLSX.writeFile(workbook, "stock_data.xlsx");
      
      toast({
        title: "내보내기 성공",
        description: "주식 데이터를 성공적으로 내보냈습니다.",
      });
    } catch (error) {
      toast({
        title: "내보내기 실패",
        description: "파일을 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-green-50">
      <CardContent className="pt-6">
        <h4 className="text-sm font-semibold mb-4">주식 데이터 관리 (Excel)</h4>
        <div className="flex flex-col space-y-2">
          <div>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImport}
              className="hidden"
              id="stockFileInput"
            />
            <Button
              onClick={() => document.getElementById('stockFileInput')?.click()}
              variant="outline"
              className="w-full justify-start"
            >
              <Import className="mr-2 h-4 w-4" />
              Excel 파일 가져오기
            </Button>
          </div>
          <Button onClick={handleExport} variant="outline" className="justify-start">
            <Save className="mr-2 h-4 w-4" />
            Excel 파일 내보내기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockDataManagement;