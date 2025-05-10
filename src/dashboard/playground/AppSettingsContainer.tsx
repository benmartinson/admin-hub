import { useState, useEffect, useMemo } from "react";
import Category from "../../common/Category";
import ToggleSetting from "../../common/ToggleSetting";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import NewSettingForm from "./NewSettingForm";
import AppSettings from "./AppSettings";
import LoadingSpinner from "@/common/LoadingSpinner";

// Define a type for individual settings based on expected structure
interface AppSetting {
  _id: Id<"appSetting">;
  category: string;
  descriptionLabel: string;
  enabled: boolean;
  // Add any other relevant fields if needed, e.g., a sortOrder field within a category
}

const AppSettingsContainer = ({
  appConfig,
}: {
  appConfig: Doc<"appConfiguration">;
}) => {
  const [isAddingSetting, setIsAddingSetting] = useState(false);

  const createAppSetting = useMutation(api.appSetting.createAppSetting);
  const updateAppSetting = useMutation(api.appSetting.updateAppSetting);

  const fetchedAppSettings = useQuery(
    api.appSetting.getAppSettingsByAppConfigId,
    { appConfigId: appConfig._id },
  );

  const handleAddSetting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!appConfig) {
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    await createAppSetting({
      appConfigId: appConfig._id,
      category: formData.get("category") as string,
      descriptionLabel: formData.get("descriptionLabel") as string,
      enabled: formData.get("enabled") === "true",
      systemValue: formData.get("systemValue") as string,
      teacherCanUpdate: formData.get("teacherCanUpdate") === "true",
    });
    setIsAddingSetting(false);
  };

  const handleUpdateSetting = async (newSetting: {
    id: Id<"appSetting">;
    enabled: boolean;
  }) => {
    if (!appConfig) {
      return;
    }
    await updateAppSetting(newSetting);
  };

  if (!fetchedAppSettings) {
    return (
      <div className="w-96 border border-r-0 border-slate-200 bg-white p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAddingSetting) {
    return (
      <NewSettingForm
        onSubmit={handleAddSetting}
        closeForm={() => setIsAddingSetting(false)}
      />
    );
  }

  const hasAppConfig = appConfig && appConfig._id;
  return (
    <div className="w-96 border border-r-0 border-slate-200 bg-white">
      {hasAppConfig ? (
        <AppSettings
          appSettings={fetchedAppSettings}
          setIsAddingSetting={setIsAddingSetting}
          handleUpdateSetting={handleUpdateSetting}
        />
      ) : (
        <div className="w-96 border border-r-0 border-slate-200 bg-white p-4"></div>
      )}
    </div>
  );
};

export default AppSettingsContainer;
