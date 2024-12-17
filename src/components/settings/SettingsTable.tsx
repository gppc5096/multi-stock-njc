import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { loadSettings, saveSettings } from "@/lib/storage";
import { Settings, SettingItem } from "@/types/settings";
import { useToast } from "@/components/ui/use-toast";
import EditDialog from "./EditDialog";

const getTypeBackgroundColor = (type: string) => {
  switch (type) {
    case 'country':
      return 'bg-red-50';
    case 'broker':
      return 'bg-green-50';
    case 'stock':
      return 'bg-blue-50';
    default:
      return '';
  }
};

const SettingsTable = () => {
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [editItem, setEditItem] = useState<SettingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(loadSettings());
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange);
  }, []);

  const handleEdit = (item: SettingItem) => {
    setEditItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const currentSettings = loadSettings();
    
    let deleted = false;
    ['countries', 'brokers', 'stocks'].forEach((category) => {
      const index = currentSettings[category].findIndex(item => item.id === id);
      if (index !== -1) {
        currentSettings[category].splice(index, 1);
        deleted = true;
      }
    });

    if (deleted) {
      saveSettings(currentSettings);
      setSettings(currentSettings);
      toast({
        title: "삭제 완료",
        description: "항목이 삭제되었습니다.",
      });
    }
  };

  const handleEditSuccess = () => {
    setSettings(loadSettings());
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>구분</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>티커</TableHead>
              <TableHead className="w-[100px]">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.countries.map((item) => (
              <TableRow key={item.id} className={getTypeBackgroundColor('country')}>
                <TableCell>국가</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {settings.brokers.map((item) => (
              <TableRow key={item.id} className={getTypeBackgroundColor('broker')}>
                <TableCell>증권사</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {settings.stocks.map((item) => (
              <TableRow key={item.id} className={getTypeBackgroundColor('stock')}>
                <TableCell>종목</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.ticker}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditDialog
        item={editItem}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default SettingsTable;