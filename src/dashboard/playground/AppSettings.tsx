import { useState, useEffect, useMemo } from "react";
import Category from "../../common/Category";
import ToggleSetting from "../../common/ToggleSetting";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import AddSettingButton from "./AddSettingButton";
// Define a type for individual settings based on expected structure
interface AppSetting {
  _id: Id<"appSetting">;
  category: string;
  descriptionLabel: string;
  enabled: boolean;
  // Add any other relevant fields if needed, e.g., a sortOrder field within a category
}

const AppSettings = ({
  appSettings,
  setIsAddingSetting,
  handleUpdateSetting,
}: {
  appSettings: Doc<"appSetting">[];
  setIsAddingSetting: (isAddingSetting: boolean) => void;
  handleUpdateSetting: (e: React.FormEvent<HTMLFormElement>) => void;
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
    // Sort categories alphabetically for consistent UI
    return Array.from(
      new Set(displaySettings.map((setting) => setting.category)),
    ).sort();
  }, [displaySettings]);

  const toggleCategory = (category: string) => {
    console.log("Toggling category:", category);
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSettingChange = async (
    settingId: Id<"appSetting">,
    newValue: boolean,
  ) => {
    setDisplaySettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting._id === settingId ? { ...setting, enabled: newValue } : setting,
      ),
    );

    await handleUpdateSetting({
      id: settingId,
      enabled: newValue,
    });
  };

  if (appSettings.length === 0) {
    return (
      <div className="w-96 border border-r-0 border-slate-200 bg-white p-4">
        <AddSettingButton setIsAddingSetting={setIsAddingSetting} />
      </div>
    );
  }

  return (
    <div className="w-96 border border-r-0 border-slate-200 bg-white">
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
                onChange={(value) => handleSettingChange(setting._id, value)}
              />
            ))}
        </Category>
      ))}
      <AddSettingButton setIsAddingSetting={setIsAddingSetting} />
    </div>
  );
};

export default AppSettings;
