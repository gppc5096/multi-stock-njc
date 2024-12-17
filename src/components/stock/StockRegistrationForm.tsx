import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadSettings } from "@/lib/storage";
import { Settings } from "@/types/settings";
import { format } from "date-fns";
import NumberInput from "./NumberInput";
import { saveStock } from "@/lib/stockStorage";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";

const StockRegistrationForm = () => {
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    type: "",
    country: "",
    broker: "",
    stockName: "",
    ticker: "",
    quantity: "",
    exchangeRate: "",
    price: "",
    usdAmount: "",
    krwAmount: "",
  });

  // 설정 변경 감지
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(loadSettings());
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange);
  }, []);

  // 종목 선택 시 티커 자동 설정
  const handleStockSelect = (stockName: string) => {
    const stock = settings.stocks.find(s => s.name === stockName);
    setFormData(prev => ({
      ...prev,
      stockName,
      ticker: stock?.ticker || ""
    }));
  };

  // 금액 계산
  const calculateAmounts = (
    quantity: string,
    price: string,
    exchangeRate: string,
    country: string
  ) => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const rate = parseFloat(exchangeRate) || 0;

    if (country === "USD") {
      const usdAmount = (qty * prc).toString();
      const krwAmount = (qty * prc * rate).toString();
      setFormData(prev => ({
        ...prev,
        usdAmount,
        krwAmount
      }));
    } else if (country === "KRW") {
      const krwAmount = (qty * prc).toString();
      setFormData(prev => ({
        ...prev,
        usdAmount: "0",
        krwAmount
      }));
    }
  };

  // 입력값 변경 시 금액 재계산
  useEffect(() => {
    calculateAmounts(
      formData.quantity,
      formData.price,
      formData.exchangeRate,
      formData.country
    );
  }, [formData.quantity, formData.price, formData.exchangeRate, formData.country]);

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.type || !formData.country || !formData.broker || !formData.stockName) {
      toast({
        variant: "destructive",
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요.",
      });
      return;
    }

    // 데이터 저장
    saveStock({
      id: crypto.randomUUID(),
      date: formData.date,
      type: formData.type as 'buy' | 'sell',
      country: formData.country as 'KRW' | 'USD',
      broker: formData.broker,
      stockName: formData.stockName,
      ticker: formData.ticker,
      quantity: parseFloat(formData.quantity) || 0,
      exchangeRate: parseFloat(formData.exchangeRate) || 0,
      price: parseFloat(formData.price) || 0,
      usdAmount: parseFloat(formData.usdAmount) || 0,
      krwAmount: parseFloat(formData.krwAmount) || 0,
    });

    // 폼 초기화
    setFormData({
      date: format(new Date(), "yyyy-MM-dd"),
      type: "",
      country: "",
      broker: "",
      stockName: "",
      ticker: "",
      quantity: "",
      exchangeRate: "",
      price: "",
      usdAmount: "",
      krwAmount: "",
    });

    // 성공 메시지
    toast({
      title: "저장 완료",
      description: "주식 정보가 성공적으로 저장되었습니다.",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <PlusCircle className="h-5 w-5 text-custom-green" />
        주식등록
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>거래일자</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div>
            <Label>구분</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="구분 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">매수</SelectItem>
                <SelectItem value="sell">매도</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>국가</Label>
            <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="국가 선택" />
              </SelectTrigger>
              <SelectContent>
                {settings.countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>증권사</Label>
            <Select value={formData.broker} onValueChange={(value) => setFormData(prev => ({ ...prev, broker: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="증권사 선택" />
              </SelectTrigger>
              <SelectContent>
                {settings.brokers.map((broker) => (
                  <SelectItem key={broker.id} value={broker.id}>
                    {broker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>종목명</Label>
            <Select value={formData.stockName} onValueChange={handleStockSelect}>
              <SelectTrigger>
                <SelectValue placeholder="종목 선택" />
              </SelectTrigger>
              <SelectContent>
                {settings.stocks.map((stock) => (
                  <SelectItem key={stock.id} value={stock.name}>
                    {stock.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>티커명</Label>
            <Input value={formData.ticker} readOnly />
          </div>

          <NumberInput
            label="매수수량"
            value={formData.quantity}
            onChange={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
          />

          <NumberInput
            label="매수환율"
            value={formData.exchangeRate}
            onChange={(value) => setFormData(prev => ({ ...prev, exchangeRate: value }))}
          />

          <NumberInput
            label="매수단가"
            value={formData.price}
            onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
          />

          <NumberInput
            label="달러매수금"
            value={formData.usdAmount}
            onChange={() => {}}
            readOnly
          />

          <NumberInput
            label="원화매수금"
            value={formData.krwAmount}
            onChange={() => {}}
            readOnly
          />
        </div>

        <Button type="submit" className="w-full bg-custom-green hover:bg-custom-green/90 text-xl">
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default StockRegistrationForm;