import GradebookDataFetcher from "@/GradebookDataFetcher";
import { AppConfig } from "@/types";
import ClassesView from "./ClassesView";
import { ConvexProvider, ConvexReactClient } from "convex/react";
const DataPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const convexOtherApp = new ConvexReactClient(appConfig.convexUrl as string);
  return (
    <>
      <ConvexProvider client={convexOtherApp}>
        <GradebookDataFetcher gradebookUrl={appConfig.convexUrl} />
        <div className="flex" style={{ scrollbarWidth: "none" }}>
          {/* <DataTables
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          /> */}
          <div className="flex h-screen w-full flex-3 border-2 border-slate-200 bg-slate-50">
            <ClassesView />
            {/* {selectedTable === "Users" && <UsersView />} */}
            {/* {selectedTable === "Grading Periods" && <GradingPeriodsView />} */}
          </div>
        </div>
      </ConvexProvider>
    </>
  );
};

export default DataPage;
