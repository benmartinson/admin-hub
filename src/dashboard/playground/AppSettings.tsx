import { useState, useMemo } from "react";
import Category from "../../common/Category";
import ToggleSetting from "../../common/ToggleSetting";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import AddSettingButton from "./AddSettingButton";
import { AppSetting } from "@/types";
import AppSettingHeader from "./AppSettingHeader";

const AppSettings = ({
  appSettings,
  setIsAddingSetting,
  setEditingSettingId,
  handleUpdateEnabled,
}: {
  appSettings: Doc<"appSetting">[];
  setIsAddingSetting: (isAddingSetting: boolean) => void;
  setEditingSettingId: (editingSettingId: Id<"appSetting"> | null) => void;
  handleUpdateEnabled: (newSetting: {
    id: Id<"appSetting">;
    enabled: boolean;
  }) => void;
}) => {
  const [displaySettings, setDisplaySettings] = useState<AppSetting[]>(
    appSettings.map((setting) => ({
      ...setting,
      enabled: setting.enabled,
    })),
  );
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>(
    appSettings.reduce(
      (acc, setting) => {
        acc[setting.category] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    ),
  );

  const uniqueCategories = useMemo(() => {
    if (!displaySettings || displaySettings.length === 0) {
      return [];
    }
    return Array.from(
      new Set(displaySettings.map((setting) => setting.category)),
    );
  }, [displaySettings]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleChangeEnabled = async (
    settingId: Id<"appSetting">,
    newValue: boolean,
  ) => {
    setDisplaySettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting._id === settingId ? { ...setting, enabled: newValue } : setting,
      ),
    );

    await handleUpdateEnabled({
      id: settingId,
      enabled: newValue,
    });
  };

  return (
    <div className="md:w-96 border md:border-r-0 max-md:w-full border-slate-200 bg-white relative">
      <AppSettingHeader />
      {uniqueCategories.map((category) => (
        <Category
          key={category}
          title={category}
          isExpanded={!!expandedCategories[category]}
          onToggle={() => toggleCategory(category)}
        >
          {displaySettings
            .filter((setting) => setting.category === category)
            .map((setting) => (
              <ToggleSetting
                key={setting._id.toString()}
                label={setting.descriptionLabel}
                value={setting.enabled}
                onChange={(value) => handleChangeEnabled(setting._id, value)}
                setIsEditing={() => setEditingSettingId(setting._id)}
              />
            ))}
        </Category>
      ))}
      <AddSettingButton setIsAddingSetting={setIsAddingSetting} />
    </div>
  );
};

export default AppSettings;
