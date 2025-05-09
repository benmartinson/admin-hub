import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CategoryProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const Category = ({ title, children, isExpanded, onToggle }: CategoryProps) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center p-4 bg-slate-50 hover:bg-slate-100"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2" />
        )}
        <span className="font-medium text-slate-600">{title}</span>
      </button>
      {isExpanded && <div className="px-8 pb-4">{children}</div>}
    </div>
  );
};

const ToggleSetting = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-6 rounded-full transition-colors ${
          value ? "bg-slate-500" : "bg-slate-200"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

const RadioSetting = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex py-2 items-center justify-between">
      <span className="text-sm text-slate-700 block">{label}</span>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              checked={value === option}
              onChange={() => onChange(option)}
              className="mr-1"
            />
            <span className="text-sm capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const AppSettings = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({
    gradebook: true,
    attendance: false,
    quizzes: false,
    reportCards: false,
  });

  const [settings, setSettings] = useState({
    gradebook: {
      showPhotos: true,
      showClassGrades: true,
      showDateOrder: true,
      showAddClassButton: true,
      gridCellSize: "md",
    },
    attendance: {
      showSection: true,
      showPhotos: true,
      useNickname: false,
    },
    quizzes: {
      showSection: true,
    },
    reportCards: {
      showSection: true,
    },
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="w-96 border border-r-0 border-slate-200 bg-white">
      <Category
        title="Gradebook"
        isExpanded={expandedCategories.gradebook}
        onToggle={() => toggleCategory("gradebook")}
      >
        <ToggleSetting
          label="Show Photos?"
          value={settings.gradebook.showPhotos}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              gradebook: { ...prev.gradebook, showPhotos: value },
            }))
          }
        />
        <ToggleSetting
          label="Show Class Grades?"
          value={settings.gradebook.showClassGrades}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              gradebook: { ...prev.gradebook, showClassGrades: value },
            }))
          }
        />
        <ToggleSetting
          label="Show Date Order?"
          value={settings.gradebook.showDateOrder}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              gradebook: { ...prev.gradebook, showDateOrder: value },
            }))
          }
        />
        <ToggleSetting
          label="Show Add Class Button?"
          value={settings.gradebook.showAddClassButton}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              gradebook: { ...prev.gradebook, showAddClassButton: value },
            }))
          }
        />
        <RadioSetting
          label="Grid Cell Size?"
          value={settings.gradebook.gridCellSize}
          options={["sm", "md", "lg"]}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              gradebook: { ...prev.gradebook, gridCellSize: value },
            }))
          }
        />
      </Category>

      <Category
        title="Attendance"
        isExpanded={expandedCategories.attendance}
        onToggle={() => toggleCategory("attendance")}
      >
        <ToggleSetting
          label="Show Section?"
          value={settings.attendance.showSection}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              attendance: { ...prev.attendance, showSection: value },
            }))
          }
        />
        <ToggleSetting
          label="Show Photos?"
          value={settings.attendance.showPhotos}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              attendance: { ...prev.attendance, showPhotos: value },
            }))
          }
        />
        <ToggleSetting
          label="Use Nickname?"
          value={settings.attendance.useNickname}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              attendance: { ...prev.attendance, useNickname: value },
            }))
          }
        />
      </Category>

      <Category
        title="Quizzes"
        isExpanded={expandedCategories.quizzes}
        onToggle={() => toggleCategory("quizzes")}
      >
        <ToggleSetting
          label="Show Section?"
          value={settings.quizzes.showSection}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              quizzes: { ...prev.quizzes, showSection: value },
            }))
          }
        />
      </Category>

      <Category
        title="Report Cards"
        isExpanded={expandedCategories.reportCards}
        onToggle={() => toggleCategory("reportCards")}
      >
        <ToggleSetting
          label="Show Section?"
          value={settings.reportCards.showSection}
          onChange={(value) =>
            setSettings((prev) => ({
              ...prev,
              reportCards: { ...prev.reportCards, showSection: value },
            }))
          }
        />
      </Category>
    </div>
  );
};

export default AppSettings;
