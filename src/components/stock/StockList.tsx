import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockTransaction } from "@/types/stock";
import { loadStocks, deleteStock } from "@/lib/stockStorage";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ClipboardList } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import EditStockDialog from "./EditStockDialog";

const StockList = () => {
  const [stocks, setStocks] = useState<StockTransaction[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockTransaction | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadStockData = () => {
    const stockData = loadStocks();
    setStocks(stockData);
  };

  useEffect(() => {
    loadStockData();
    
    window.addEventListener('stocksChanged', loadStockData);
    return () => window.removeEventListener('stocksChanged', loadStockData);
  }, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const handleDelete = (id: string, stockName: string) => {
    deleteStock(id);
    toast({
      title: "삭제 완료",
      description: `${stockName} 주식이 삭제되었습니다.`,
    });
  };

  const handleEdit = (stock: StockTransaction) => {
    setSelectedStock(stock);
    setEditDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          주식현황
        </h3>
        <Card className="w-full overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">거래일자</TableHead>
                  <TableHead className="min-w-[80px]">구분</TableHead>
                  <TableHead className="min-w-[100px]">국가</TableHead>
                  <TableHead className="min-w-[120px]">증권사</TableHead>
                  <TableHead className="min-w-[150px]">종목명</TableHead>
                  <TableHead className="min-w-[100px]">티커</TableHead>
                  <TableHead className="min-w-[100px] text-right">수량</TableHead>
                  <TableHead className="min-w-[100px] text-right">환율</TableHead>
                  <TableHead className="min-w-[100px] text-right">단가</TableHead>
                  <TableHead className="min-w-[120px] text-right">달러매수금</TableHead>
                  <TableHead className="min-w-[120px] text-right">원화매수금</TableHead>
                  <TableHead className="min-w-[120px] text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center h-24">
                      등록된 주식이 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  stocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell>{stock.date}</TableCell>
                      <TableCell>{stock.type === 'buy' ? '매수' : '매도'}</TableCell>
                      <TableCell>{stock.country}</TableCell>
                      <TableCell>{stock.broker}</TableCell>
                      <TableCell>{stock.stockName}</TableCell>
                      <TableCell>{stock.ticker}</TableCell>
                      <TableCell className="text-right">{formatNumber(stock.quantity)}</TableCell>
                      <TableCell className="text-right">{formatNumber(stock.exchangeRate)}</TableCell>
                      <TableCell className="text-right">{formatNumber(stock.price)}</TableCell>
                      <TableCell className="text-right">
                        {stock.country === 'USD' && `$${formatNumber(stock.usdAmount)}`}
                      </TableCell>
                      <TableCell className="text-right">₩{formatNumber(stock.krwAmount)}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(stock)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-destructive hover:bg-destructive/90 hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {stock.stockName} 주식 데이터가 영구적으로 삭제됩니다.
                                  이 작업은 되돌릴 수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(stock.id, stock.stockName)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
      <EditStockDialog
        stock={selectedStock}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={loadStockData}
      />
    </>
  );
};

export default StockList;