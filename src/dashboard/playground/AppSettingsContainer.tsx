import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import NewSettingForm from "./NewSettingForm";
import AppSettings from "./AppSettings";
import EditSettingForm from "./EditSettingForm";
import AppSettingHeader from "./AppSettingHeader";

const AppSettingsContainer = ({
  appConfig,
}: {
  appConfig: Doc<"appConfiguration">;
}) => {
  const [isAddingSetting, setIsAddingSetting] = useState(false);
  const [editingSettingId, setEditingSettingId] =
    useState<Id<"appSetting"> | null>(null);
  const createAppSetting = useMutation(api.appSetting.createAppSetting);
  const updateAppSetting = useMutation(api.appSetting.updateAppSetting);
  const deleteAppSetting = useMutation(api.appSetting.deleteAppSetting);
  const fetchedAppSettings = useQuery(
    api.appSetting.getAppSettingsByAppConfigId,
    { appConfigId: appConfig._id },
  );

  const handleAddSetting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await createAppSetting({
      appConfigId: appConfig._id,
      category: formData.get("category") as string,
      descriptionLabel: formData.get("descriptionLabel") as string,
      enabled: formData.get("enabled") === "on",
      systemValue: formData.get("systemValue") as string,
      teacherCanUpdate: formData.get("teacherCanUpdate") === "on",
    });
    setIsAddingSetting(false);
  };

  const handleUpdateEnabled = async (newSetting: {
    id: Id<"appSetting">;
    enabled: boolean;
  }) => {
    if (!appConfig) {
      return;
    }
    await updateAppSetting({
      id: newSetting.id,
      enabled: newSetting.enabled,
    });
  };

  const handleUpdateSetting = async (
    e: React.FormEvent<HTMLFormElement>,
    settingId: Id<"appSetting">,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await updateAppSetting({
      id: settingId,
      descriptionLabel: formData.get("descriptionLabel") as string,
      systemValue: formData.get("systemValue") as string,
      category: formData.get("category") as string,
      enabled: formData.get("enabled") === "on",
      teacherCanUpdate: formData.get("teacherCanUpdate") === "on",
    });
    setEditingSettingId(null);
  };

  const handleDeleteSetting = async (settingId: Id<"appSetting">) => {
    await deleteAppSetting({ id: settingId });
    setEditingSettingId(null);
  };

  if (!fetchedAppSettings) {
    return (
      <div className="border border-r-0 border-slate-200 bg-white">
        <div className="w-96 border border-r-0 border-slate-200 bg-white relative">
          <AppSettingHeader />
        </div>
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

  if (editingSettingId) {
    const setting = fetchedAppSettings.find(
      (setting) => setting._id === editingSettingId,
    );
    if (!setting) {
      return (
        <div className="w-96 border border-r-0 border-slate-200 bg-white p-4">
          Setting not found
        </div>
      );
    }
    return (
      <EditSettingForm
        initialFormData={setting}
        onSubmit={(e) => handleUpdateSetting(e, editingSettingId)}
        closeForm={() => setEditingSettingId(null)}
        onDelete={() => handleDeleteSetting(editingSettingId)}
      />
    );
  }
  const hasAppConfig = appConfig && appConfig._id;
  return (
    <div className="border border-r-0 border-slate-200 bg-white">
      {hasAppConfig ? (
        <AppSettings
          appSettings={fetchedAppSettings}
          setIsAddingSetting={setIsAddingSetting}
          setEditingSettingId={setEditingSettingId}
          handleUpdateEnabled={handleUpdateEnabled}
        />
      ) : (
        <div className=" border border-r-0 border-slate-200 bg-white p-4"></div>
      )}
    </div>
  );
};

export default AppSettingsContainer;
