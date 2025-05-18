import {
  faExchangeAlt,
  faDatabase,
  faChartBar,
  faWrench,
  faMountainSun,
} from "@fortawesome/free-solid-svg-icons";

export const navItems = [
  { name: "View", icon: faMountainSun },
  { name: "Data", icon: faDatabase, isDisabled: true },
  { name: "Reports", icon: faChartBar, isDisabled: true },
  { name: "Changes", icon: faExchangeAlt, isDisabled: true },
  { name: "Setup", icon: faWrench },
];

export const classDataTabs = ["Details", "Students"];
