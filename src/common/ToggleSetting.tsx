interface ToggleSettingProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleSetting = ({ label, value, onChange }: ToggleSettingProps) => {
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

export default ToggleSetting;
