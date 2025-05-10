import { useQuery } from "convex/react";
import AppSettings from "./AppSettings";
import AppView from "./AppView";
import { api } from "../../../convex/_generated/api";
import LoadingSpinner from "@/common/LoadingSpinner";
import AppSettingsContainer from "./AppSettingsContainer";

const ViewPage = () => {
  const appConfig = useQuery(api.appConfiguration.getAppConfiguration, {
    appId: 1,
  });

  if (!appConfig) {
    return (
      <div className="text-center text-slate-400 w-full mt-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (!appConfig.testUrl) {
    return (
      <div className="flex h-screen w-full bg-white flex-3 border text-center text-slate-400  justify-center pt-16 border-slate-200">
        No test URL configured. Please configure the app on the configuration
        page.
      </div>
    );
  }

  return (
    <>
      <div className="flex p-2 items center text-slate-400">
        Adjust the settings for the app
      </div>
      <div className="flex" style={{ scrollbarWidth: "none" }}>
        <AppSettingsContainer appConfig={appConfig} />
        <AppView appConfig={appConfig} />
      </div>
    </>
  );
};

export default ViewPage;
