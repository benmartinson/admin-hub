import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faExchangeAlt,
  faDatabase,
  faChartBar,
  faCog,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navItems = [
    { name: "Playground", icon: faPlay },
    { name: "Changes", icon: faExchangeAlt },
    { name: "Data", icon: faDatabase },
    { name: "Reports", icon: faChartBar },
    { name: "Settings", icon: faCog },
    { name: "Configuration", icon: faWrench },
  ];

  return (
    <div className="w-64 bg-slate-800 text-slate-100 h-screen p-5 box-border font-sans">
      <ul className="list-none p-0 m-0">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center py-4 px-3 cursor-pointer rounded transition-colors duration-200 ease-in-out hover:bg-slate-700"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="mr-4 w-5 text-center"
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
