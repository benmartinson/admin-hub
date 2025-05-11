import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddSettingButton = ({
  setIsAddingSetting,
}: {
  setIsAddingSetting: (isAddingSetting: boolean) => void;
}) => {
  return (
    <button
      className="absolute -bottom-12 right-2 rounded-md h-12 bg-transparent flex justify-start items-center text-slate-400 hover:text-slate-500 text-sm p-2 cursor-pointer"
      onClick={() => setIsAddingSetting(true)}
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Setting
    </button>
  );
};

export default AddSettingButton;
