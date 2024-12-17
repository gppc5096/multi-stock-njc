import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadSettings, saveSettings } from "@/lib/storage";
import { SettingItem } from "@/types/settings";

type SettingType = "country" | "broker" | "stock";

const SettingsForm = () => {
  const [type, setType] = useState<SettingType>("country");
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const { toast } = useToast();

  // 입력값을 변환하는 함수
  const transformInput = (value: string) => {
    // 한글, 영문, 숫자만 허용하고 영문은 대문자로 변환
    const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const alphaNumericPattern = /[a-zA-Z0-9\s]/;
    
    return value
      .split('')
      .filter(char => koreanPattern.test(char) || alphaNumericPattern.test(char))
      .join('')
      .toUpperCase();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const transformedValue = transformInput(e.target.value);
    setName(transformedValue);
  };

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const transformedValue = transformInput(e.target.value);
    setTicker(transformedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "오류",
        description: "이름을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    if (type === "stock" && !ticker) {
      toast({
        title: "오류",
        description: "티커를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    const settings = loadSettings();
    const newItem: SettingItem = {
      id: type === "stock" ? ticker : name,
      type,
      name,
      ...(type === "stock" && { ticker })
    };

    // 중복 체크
    const list = type === "country" ? settings.countries :
                type === "broker" ? settings.brokers :
                settings.stocks;
    
    if (list.some(item => item.id === newItem.id)) {
      toast({
        title: "오류",
        description: "이미 존재하는 항목입니다.",
        variant: "destructive"
      });
      return;
    }

    // 새 항목 추가
    if (type === "country") settings.countries.push(newItem);
    else if (type === "broker") settings.brokers.push(newItem);
    else settings.stocks.push(newItem);

    saveSettings(settings);
    
    toast({
      title: "항목이 추가되었습니다.",
      description: `${type}: ${name}${ticker ? ` (${ticker})` : ''}`,
    });
    
    setName("");
    setTicker("");

    // 테이블 새로고침을 위해 이벤트 발생
    window.dispatchEvent(new Event('settingsChanged'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-primary" />
        항목 추가
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="type">항목 유형</Label>
          <Select value={type} onValueChange={(value: SettingType) => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="항목 유형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country">국가</SelectItem>
              <SelectItem value="broker">증권사</SelectItem>
              <SelectItem value="stock">종목</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={type === "stock" ? "md:col-span-2" : "md:col-span-3"}>
          <Label htmlFor="name">
            {type === "country" ? "국가명" : type === "broker" ? "증권사명" : "종목명"}
          </Label>
          <Input
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder={
              type === "country" ? "예: KRW, USD" : 
              type === "broker" ? "예: 한투증권" : 
              "예: TIGER 미국S&P500"
            }
          />
        </div>

        {type === "stock" && (
          <div>
            <Label htmlFor="ticker">티커</Label>
            <Input
              id="ticker"
              value={ticker}
              onChange={handleTickerChange}
              placeholder="예: 360750"
            />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full md:w-auto">
        <Plus className="w-4 h-4 mr-2" />
        추가하기
      </Button>
    </form>
  );
};

export default SettingsForm;