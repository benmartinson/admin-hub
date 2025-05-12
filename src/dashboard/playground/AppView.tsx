import classNames from "classnames";
import { Doc } from "../../../convex/_generated/dataModel";

const AppView = ({
  appConfig,
  selectedScreenSize,
}: {
  appConfig: Doc<"appConfiguration">;
  selectedScreenSize: "mobile" | "normal" | "maximize";
}) => {
  const iframeClasses = classNames(
    "flex h-screen w-full flex-3 bg-white  border border-slate-200",
    {
      "px-68 py-4": selectedScreenSize === "mobile",
    },
  );

  return (
    <div className={iframeClasses}>
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
