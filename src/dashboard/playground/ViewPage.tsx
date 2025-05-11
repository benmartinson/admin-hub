import { useQuery } from "convex/react";
import AppSettings from "./AppSettings";
import AppView from "./AppView";
import { api } from "../../../convex/_generated/api";
import LoadingSpinner from "@/common/LoadingSpinner";
import AppSettingsContainer from "./AppSettingsContainer";
import { useState } from "react";
import {
  faExpand,
  faGear,
  faMaximize,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const ViewPage = () => {
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [selectedScreenSize, setSelectedScreenSize] = useState<
    "mobile" | "normal" | "maximize"
  >("normal");
  const appConfig = useQuery(api.appConfiguration.getAppConfiguration, {
    appId: 1,
  });

  if (!appConfig) {
    return (
      <div className="text-center text-slate-400 w-full mt-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (!appConfig.testUrl) {
    return (
      <div className="flex h-screen w-full bg-white flex-3 border text-center text-slate-400  justify-center pt-16 border-slate-200">
        No test URL configured. Please configure the app on the configuration
        page.
      </div>
    );
  }

  const screenSizeClasses = (isSelected: boolean) => {
    return classNames({
      "text-slate-700": isSelected,
      "text-slate-400  cursor-pointer": !isSelected,
    });
  };

  return (
    <>
      <div className="flex w-full justify-between p-2 items-center text-slate-400">
        <div>Adjust the settings for the app</div>
        <div className="flex gap-8 text-2xl">
          <FontAwesomeIcon
            icon={faMobileScreenButton}
            className={screenSizeClasses(selectedScreenSize === "mobile")}
            onClick={() => setSelectedScreenSize("mobile")}
          />
          <FontAwesomeIcon
            icon={faExpand}
            className={screenSizeClasses(selectedScreenSize === "normal")}
            onClick={() => setSelectedScreenSize("normal")}
          />
          <FontAwesomeIcon
            icon={faMaximize}
            className={screenSizeClasses(selectedScreenSize === "maximize")}
            onClick={() => setSelectedScreenSize("maximize")}
          />
        </div>
      </div>
      <div className="flex" style={{ scrollbarWidth: "none" }}>
        {selectedScreenSize !== "maximize" && (
          <AppSettingsContainer
            appConfig={appConfig}
            toggleRefresh={toggleRefresh}
            setToggleRefresh={setToggleRefresh}
          />
        )}
        <AppView
          appConfig={appConfig}
          toggleRefresh={toggleRefresh}
          selectedScreenSize={selectedScreenSize}
        />
      </div>
    </>
  );
};

export default ViewPage;
