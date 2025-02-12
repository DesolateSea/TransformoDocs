import { MetricsHeader } from "../components/dashboard/MetricsHeader";
import { ConversionChart } from "../components/dashboard/ConversionChart";
import { SystemStatus } from "../components/dashboard/SystemStatus";
import { StorageStatus } from "../components/dashboard/StorageStatus";
import { ConversionHistory } from "../components/dashboard/ConversionHistory";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <MetricsHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ConversionChart />
        <SystemStatus />
        <StorageStatus />
      </div>
      <ConversionHistory />
    </div>
  );
};

export default Dashboard;
