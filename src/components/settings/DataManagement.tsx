import StockDataManagement from "./StockDataManagement";
import SettingsDataManagement from "./SettingsDataManagement";
import ResetDataDialog from "./ResetDataDialog";

const DataManagement = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <StockDataManagement />
      <SettingsDataManagement />
      <ResetDataDialog />
    </div>
  );
};

export default DataManagement;