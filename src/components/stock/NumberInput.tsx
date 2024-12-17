import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const NumberInput = ({ label, value, onChange, placeholder = "0", readOnly = false }: NumberInputProps) => {
  // 숫자 입력 처리 함수
  const handleNumberInput = (inputValue: string) => {
    // 숫자와 소수점만 허용
    const cleanValue = inputValue.replace(/[^\d.]/g, '');
    onChange(cleanValue);
  };

  // 천단위 구분 기호 포맷팅
  const formatNumber = (value: string) => {
    if (!value) return "";
    const number = parseFloat(value);
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div>
      <Label>{label}</Label>
      <Input
        value={formatNumber(value)}
        onChange={(e) => handleNumberInput(e.target.value.replace(/,/g, ''))}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          readOnly && "bg-custom-gray border-custom-orange cursor-not-allowed"
        )}
      />
    </div>
  );
};

export default NumberInput;