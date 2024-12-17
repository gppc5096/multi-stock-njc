import StockRegistrationForm from "@/components/stock/StockRegistrationForm";
import StockList from "@/components/stock/StockList";

const Index = () => {
  return (
    <div className="container py-6 space-y-8">
      <StockRegistrationForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            주식 목록
          </span>
        </div>
      </div>
      <StockList />
    </div>
  );
};

export default Index;