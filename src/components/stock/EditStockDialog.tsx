import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StockTransaction } from "@/types/stock";
import { loadSettings } from "@/lib/storage";
import { updateStock } from "@/lib/stockStorage";
import { useToast } from "@/components/ui/use-toast";

interface EditStockDialogProps {
  stock: StockTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const EditStockDialog = ({ stock, open, onOpenChange, onSuccess }: EditStockDialogProps) => {
  const [date, setDate] = useState("");
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [country, setCountry] = useState<"KRW" | "USD">("KRW");
  const [broker, setBroker] = useState("");
  const [stockName, setStockName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();
  const settings = loadSettings();

  useEffect(() => {
    if (stock && open) {
      setDate(stock.date);
      setType(stock.type);
      setCountry(stock.country);
      setBroker(stock.broker);
      setStockName(stock.stockName);
      setTicker(stock.ticker);
      setQuantity(stock.quantity.toString());
      setExchangeRate(stock.exchangeRate.toString());
      setPrice(stock.price.toString());
    }
  }, [stock, open]);

  const handleSave = () => {
    if (!stock) return;

    const updatedStock: StockTransaction = {
      ...stock,
      date,
      type,
      country,
      broker,
      stockName,
      ticker,
      quantity: Number(quantity),
      exchangeRate: Number(exchangeRate),
      price: Number(price),
      usdAmount: country === "USD" ? Number(quantity) * Number(price) : 0,
      krwAmount:
        country === "USD"
          ? Number(quantity) * Number(price) * Number(exchangeRate)
          : Number(quantity) * Number(price),
    };

    updateStock(updatedStock);
    
    toast({
      title: "수정 완료",
      description: `${stockName} 주식이 수정되었습니다.`,
    });
    
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>주식 수정</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              거래일자
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">구분</Label>
            <Select value={type} onValueChange={(value: "buy" | "sell") => setType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">매수</SelectItem>
                <SelectItem value="sell">매도</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">국가</Label>
            <Select value={country} onValueChange={(value: "KRW" | "USD") => setCountry(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {settings.countries.map((c) => (
                  <SelectItem key={c.id} value={c.name as "KRW" | "USD"}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">증권사</Label>
            <Select value={broker} onValueChange={setBroker}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {settings.brokers.map((b) => (
                  <SelectItem key={b.id} value={b.name}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">종목명</Label>
            <Select value={stockName} onValueChange={(value) => {
              const stock = settings.stocks.find((s) => s.name === value);
              setStockName(value);
              if (stock?.ticker) {
                setTicker(stock.ticker);
              }
            }}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {settings.stocks.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ticker" className="text-right">
              티커
            </Label>
            <Input
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              수량
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exchangeRate" className="text-right">
              환율
            </Label>
            <Input
              id="exchangeRate"
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              단가
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStockDialog;