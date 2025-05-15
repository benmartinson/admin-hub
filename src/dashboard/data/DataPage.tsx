import GradebookDataFetcher from "@/GradebookDataFetcher";
import { AppConfig } from "@/types";
import DataTables from "./DataTables";
const DataPage = ({ appConfig }: { appConfig: AppConfig }) => {
  return (
    <>
      <GradebookDataFetcher gradebookUrl={appConfig.convexUrl} />
      <div className="flex" style={{ scrollbarWidth: "none" }}>
        <DataTables />
        <div className="flex h-screen w-full flex-3 border border-slate-200"></div>
      </div>
    </>
  );
};

export default DataPage;
