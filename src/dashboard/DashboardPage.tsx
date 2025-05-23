import { useQuery } from "convex/react";
import { Routes, Route, Navigate } from "react-router-dom";
import ConfigurationPage from "./ConfigurationPage";
import DataPage from "./data/DataPage";
import ViewPage from "./playground/ViewPage";
import { api } from "../../convex/_generated/api";

const DashboardPage = () => {
  const appConfig = useQuery(api.appConfiguration.getAppConfiguration, {
    appId: 1,
  });

  return (
    <div className="p-12 pt-4 h-full min-h-screen bg-[#FAFAFA]">
      <Routes>
        <Route path="view" element={<ViewPage />} />
        {appConfig && (
          <>
            <Route path="data" element={<DataPage appConfig={appConfig} />} />
            <Route
              path="setup"
              element={<ConfigurationPage appConfig={appConfig} />}
            />
          </>
        )}
        <Route index element={<Navigate to="view" replace />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
