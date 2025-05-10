import LoadingSpinner from "@/common/LoadingSpinner";
import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const AppView = ({ appConfig }: { appConfig: Doc<"appConfiguration"> }) => {
  return (
    <div className="flex h-screen w-full bg-white flex-3 border border-slate-200">
      <iframe
        src={`${appConfig.testUrl}`}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="lms"
      />
    </div>
  );
};

export default AppView;
