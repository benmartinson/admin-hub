import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToggleSettingProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const ToggleSetting = ({
  label,
  value,
  onChange,
  setIsEditing,
}: ToggleSettingProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
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
        <FontAwesomeIcon
          icon={faGear}
          className="text-slate-500 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      </div>
    </div>
  );
};

export default ToggleSetting;
