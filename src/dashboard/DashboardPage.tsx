import ConfigurationPage from "./ConfigurationPage";
import ViewPage from "./playground/ViewPage";

const DashboardPage = ({ selectedTab }: { selectedTab: string }) => {
  let content;
  if (selectedTab === "View") {
    content = <ViewPage />;
  }

  if (selectedTab === "Setup") {
    content = <ConfigurationPage />;
  }

  return <div className="p-12 pt-4 h-full bg-[#FAFAFA]">{content}</div>;
};

export default DashboardPage;
