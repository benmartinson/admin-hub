import ConfigurationPage from "./ConfigurationPage";
import ViewPage from "./playground/ViewPage";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const DashboardPage = ({ selectedTab }: { selectedTab: string }) => {
  let content;
  if (selectedTab === "Customizations") {
    content = <ViewPage />;
  }

  if (selectedTab === "Configuration") {
    content = <ConfigurationPage />;
  }

  return <div className="p-12 pt-4">{content}</div>;
};

export default DashboardPage;
