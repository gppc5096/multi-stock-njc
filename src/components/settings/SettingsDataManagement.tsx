import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadSettings, saveSettings } from "@/lib/storage";

const SettingsDataManagement = () => {
  const { toast } = useToast();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const settings = JSON.parse(text);
      saveSettings(settings);
      
      toast({
        title: "가져오기 성공",
        description: "설정 데이터를 성공적으로 가져왔습니다.",
      });
      
      window.dispatchEvent(new Event('settingsChanged'));
    } catch (error) {
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
      const settings = loadSettings();
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'settings.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "내보내기 성공",
        description: "설정 데이터를 성공적으로 내보냈습니다.",
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
        <h4 className="text-sm font-semibold mb-4">설정 데이터 관리 (JSON)</h4>
        <div className="flex flex-col space-y-2">
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="settingsFileInput"
            />
            <Button
              onClick={() => document.getElementById('settingsFileInput')?.click()}
              variant="outline"
              className="w-full justify-start"
            >
              <Import className="mr-2 h-4 w-4" />
              JSON 파일 가져오기
            </Button>
          </div>
          <Button onClick={handleExport} variant="outline" className="justify-start">
            <Save className="mr-2 h-4 w-4" />
            JSON 파일 내보내기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsDataManagement;