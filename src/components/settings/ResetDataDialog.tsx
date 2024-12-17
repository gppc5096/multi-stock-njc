import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveSettings } from "@/lib/storage";
import { DEFAULT_SETTINGS } from "@/types/settings";
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

const ResetDataDialog = () => {
  const { toast } = useToast();

  const handleReset = () => {
    try {
      saveSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('stocks');
      window.dispatchEvent(new Event('settingsChanged'));
      
      toast({
        title: "초기화 완료",
        description: "모든 데이터가 초기화되었습니다.",
      });
    } catch (error) {
      toast({
        title: "초기화 실패",
        description: "데이터를 초기화하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardContent className="pt-6">
        <h4 className="text-sm font-semibold mb-4">데이터 초기화</h4>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full justify-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              모든 데이터 초기화
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 초기화하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다. 모든 설정과 주식 데이터가 초기 상태로 돌아갑니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>초기화</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default ResetDataDialog;