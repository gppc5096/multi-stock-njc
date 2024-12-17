import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SettingsForm from "@/components/settings/SettingsForm";
import SettingsTable from "@/components/settings/SettingsTable";
import DataManagement from "@/components/settings/DataManagement";
import { Separator } from "@/components/ui/separator";
import { Settings2, ListPlus, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="container py-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <ListPlus className="h-6 w-6 text-primary" />
          항목 관리
        </h2>
        <div className="space-y-4">
          <SettingsForm />
          <SettingsTable />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          데이터 관리
        </h2>
        <DataManagement />
      </div>
    </div>
  );
};

export default Settings;