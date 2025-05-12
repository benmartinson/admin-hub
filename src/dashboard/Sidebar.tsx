import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "@/constants";
import classNames from "classnames";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
  showSidebarIcons,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  showSidebarIcons: boolean;
}) => {
  const isSelected = (item: { name: string }) => selectedTab === item.name;
  const listClasses = (item: { name: string; isDisabled?: boolean }) =>
    classNames(
      "flex flex-col gap-1 py-2 mt-1 items-center border-b-2 py-1 px-0.5 group",
      {
        "text-black border-black": isSelected(item),
        "text-slate-500 border-white ": !isSelected(item),
        "hover:border-slate-300 hover:text-slate-700 cursor-pointer":
          !item.isDisabled,
      },
    );

  const iconClasses = (item: { name: string; isDisabled?: boolean }) =>
    classNames("w-5 h-5", {
      "text-black": isSelected(item),
      "text-slate-400 ": !isSelected(item),
      "opacity-0 transition-opacity duration-200 ease-in-out":
        !showSidebarIcons,
      "opacity-50": item.isDisabled && showSidebarIcons,
      "group-hover:text-slate-600": !item.isDisabled,
    });

  return (
    <div className="w-full font-sans pl-12 z-10 bg-white sticky -top-5 z-10 bg-white">
      <ul className="list-none p-0 m-0 flex justify-start items-center gap-8">
        {navItems.map((item) => (
          <li
            key={item.name}
            className={listClasses(item)}
            onClick={() => (item.isDisabled ? null : setSelectedTab(item.name))}
          >
            <FontAwesomeIcon icon={item.icon} className={iconClasses(item)} />
            <span
              className={` text-sm font-medium ${
                item.isDisabled && "opacity-50"
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
