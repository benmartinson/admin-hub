import GradebookDataFetcher from "@/GradebookDataFetcher";
import { AppConfig, ClassItem } from "@/types";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import ClassList from "./ClassList";
import { useState } from "react";
import ClassDetails from "./ClassDetails";
import ClassStudents from "./ClassStudents";
import { useAppStore } from "@/appStore";

const DataPage = ({ appConfig }: { appConfig: AppConfig }) => {
  const convexOtherApp = new ConvexReactClient(appConfig.convexUrl as string);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>("Details");
  const { classes } = useAppStore();
  const classDetails = classes.find(
    (classItem) => classItem._id === selectedClass,
  );

  return (
    <>
      <ConvexProvider client={convexOtherApp}>
        <GradebookDataFetcher gradebookUrl={appConfig.convexUrl} />
        <div className="flex" style={{ scrollbarWidth: "none" }}>
          <ClassList
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="flex h-screen w-full flex-3 border-2 border-slate-200 bg-slate-50">
            {classDetails && (
              <>
                {selectedTab === "Details" && (
                  <ClassDetails selectedClass={selectedClass} />
                )}
                {selectedTab === "Students" && (
                  <ClassStudents classDetails={classDetails} />
                )}
              </>
            )}
          </div>
        </div>
      </ConvexProvider>
    </>
  );
};

export default DataPage;
