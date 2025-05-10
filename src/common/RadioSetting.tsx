interface RadioSettingProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const RadioSetting = ({
  label,
  value,
  options,
  onChange,
}: RadioSettingProps) => {
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

export default RadioSetting;
