import { AppConfig, ClassItem } from "@/types";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import ClassList from "./ClassList";
import { useState, useMemo } from "react";
import ClassDetails from "./ClassDetails";
import ClassStudents from "./ClassStudents";
import ClassView from "./ClassView";

const DataPageContent = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>("Details");
  const classes = useQuery("classes:getClasses" as any) || [];
  const classDetails = classes.find(
    (classItem: ClassItem) => classItem._id === selectedClass,
  );

  return (
    <div className="flex" style={{ scrollbarWidth: "none" }}>
      <ClassList
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex h-screen w-full flex-3 border-2 border-slate-200 bg-slate-50">
        {classDetails && <ClassView classDetails={classDetails} />}
      </div>
    </div>
  );
};

const DataPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const convexOtherApp = useMemo(
    () => new ConvexReactClient(appConfig.convexUrl as string),
    [appConfig.convexUrl]
  );

  return (
    <ConvexProvider client={convexOtherApp}>
      <DataPageContent />
    </ConvexProvider>
  );
};

export default DataPage;
