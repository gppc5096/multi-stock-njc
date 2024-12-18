import { Settings2, ListPlus, Database, Lock } from "lucide-react";
import SettingsForm from "@/components/settings/SettingsForm";
import SettingsTable from "@/components/settings/SettingsTable";
import DataManagement from "@/components/settings/DataManagement";
import PasswordManagement from "@/components/settings/PasswordManagement";

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

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lock className="h-6 w-6 text-primary" />
          보안 설정
        </h2>
        <PasswordManagement />
      </div>
    </div>
  );
};

export default Settings;