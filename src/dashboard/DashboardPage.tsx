import ViewPage from "./playground/ViewPage";

const DashboardPage = ({ selectedTab }: { selectedTab: string }) => {
  if (selectedTab === "View") {
    return <ViewPage />;
  }

  return null;
};

export default DashboardPage;
