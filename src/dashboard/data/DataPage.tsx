import GradebookDataFetcher from "@/GradebookDataFetcher";
import { AppConfig, DataTablesType } from "@/types";
import DataTables from "./DataTables";
import { useState } from "react";
import GradingPeriodsView from "./GradingPeriodsView";
import ClassesView from "./ClassesView";
import UsersView from "./UsersView";
const DataPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const [selectedTable, setSelectedTable] = useState<DataTablesType>("Classes");

  return (
    <>
      <GradebookDataFetcher gradebookUrl={appConfig.convexUrl} />
      <div className="flex" style={{ scrollbarWidth: "none" }}>
        <DataTables
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
        <div className="flex h-screen w-full flex-3 border border-l-0 border-slate-200 bg-slate-50">
          {selectedTable === "Classes" && <ClassesView />}
          {selectedTable === "Users" && <UsersView />}
          {selectedTable === "Grading Periods" && <GradingPeriodsView />}
        </div>
      </div>
    </>
  );
};

export default DataPage;
