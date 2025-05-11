import LoadingSpinner from "@/common/LoadingSpinner";
import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";

const AppView = ({
  appConfig,
  toggleRefresh,
}: {
  appConfig: Doc<"appConfiguration">;
  toggleRefresh: boolean;
}) => {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey((prevKey) => prevKey + 1);
  }, [toggleRefresh]);

  return (
    <div className="flex h-screen w-full bg-white flex-3 border border-slate-200">
      <iframe
        key={iframeKey}
        src={`${appConfig.testUrl}`}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="lms"
      />
    </div>
  );
};

export default AppView;
