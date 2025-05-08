import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "@/constants";
import classNames from "classnames";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  console.log(selectedTab);
  const isSelected = (item: { name: string }) => selectedTab === item.name;
  const listClasses = (item: { name: string }) =>
    classNames("flex items-center py-3 px-0.5 cursor-pointer group", {
      "text-black border-b-2 border-black": isSelected(item),
      "text-slate-500 hover:border-b-2 hover:border-slate-300 hover:text-slate-500":
        !isSelected(item),
    });

  const iconClasses = (item: { name: string }) =>
    classNames("mr-2 w-5 h-5", {
      "text-black": isSelected(item),
      "text-slate-300 group-hover:text-slate-500": !isSelected(item),
    });

  return (
    <div className="w-full py-4 font-sans ml-12">
      <ul className="list-none p-0 m-0 flex justify-start items-center gap-8">
        {navItems.map((item) => (
          <li
            key={item.name}
            className={listClasses(item)}
            onClick={() => setSelectedTab(item.name)}
          >
            <FontAwesomeIcon icon={item.icon} className={iconClasses(item)} />
            <span className="text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
