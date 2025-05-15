import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "@/constants";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Sidebar = ({ showSidebarIcons }: { showSidebarIcons: boolean }) => {
  const getListClasses = (isActive: boolean, isDisabled?: boolean) =>
    classNames(
      "flex flex-col gap-1 py-2 mt-1 items-center border-b-2 py-1 px-0.5 group",
      {
        "text-black border-black": isActive,
        "text-slate-500 border-white ": !isActive,
        "hover:border-slate-300 hover:text-slate-700 cursor-pointer":
          !isDisabled,
        "opacity-50 cursor-not-allowed": isDisabled,
      },
    );

  const getIconClasses = (isActive: boolean, isDisabled?: boolean) =>
    classNames("w-5 h-5", {
      "text-black": isActive,
      "text-slate-400 ": !isActive,
      "opacity-0 transition-opacity duration-200 ease-in-out":
        !showSidebarIcons,
      "opacity-50": isDisabled && showSidebarIcons,
      "group-hover:text-slate-600": !isDisabled,
    });

  const updatedNavItems = navItems.map((item) => ({
    ...item,
    to: `/dashboard/${item.name.toLowerCase()}`,
  }));

  return (
    <div className="w-full font-sans pl-12 z-10 bg-white sticky -top-5 z-10 bg-white">
      <ul className="list-none p-0 m-0 flex justify-start items-center gap-8">
        {updatedNavItems.map((item) => (
          <li key={item.name} className="flex">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                getListClasses(isActive, item.isDisabled)
              }
              onClick={(e) => item.isDisabled && e.preventDefault()}
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={getIconClasses(isActive, item.isDisabled)}
                  />
                  <span
                    className={` text-sm font-medium ${
                      item.isDisabled && "opacity-50"
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
