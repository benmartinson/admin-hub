import classNames from "classnames";
import { Doc } from "../../../convex/_generated/dataModel";
import { useEffect, useState } from "react";

const AppView = ({
  appConfig,
  toggleRefresh,
  selectedScreenSize,
}: {
  appConfig: Doc<"appConfiguration">;
  toggleRefresh: boolean;
  selectedScreenSize: "mobile" | "normal" | "maximize";
}) => {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey((prevKey) => prevKey + 1);
  }, [toggleRefresh]);

  const iframeClasses = classNames(
    "flex h-screen w-full flex-3 bg-white  border border-slate-200",
    {
      "px-68 py-4": selectedScreenSize === "mobile",
    },
  );

  if (selectedScreenSize === "mobile") {
    return (
      <div className={iframeClasses}>
        <iframe
          key={iframeKey}
          src={`${appConfig.testUrl}`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="lms"
        />
      </div>
    );
  }

  return (
    <div className={iframeClasses}>
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
