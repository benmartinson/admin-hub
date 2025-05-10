const AddSettingButton = ({
  setIsAddingSetting,
}: {
  setIsAddingSetting: (isAddingSetting: boolean) => void;
}) => {
  return (
    <button
      className="rounded-md h-12 w-full flex justify-start items-center text-slate-500 bg-white p-2 cursor-pointer"
      onClick={() => setIsAddingSetting(true)}
    >
      Add Setting
    </button>
  );
};

export default AddSettingButton;
