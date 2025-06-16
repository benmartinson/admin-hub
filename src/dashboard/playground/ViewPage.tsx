import { useQuery } from "convex/react";
import AppView from "./AppView";
import { api } from "../../../convex/_generated/api";
import AppSettingsContainer from "./AppSettingsContainer";
import { useState, useEffect } from "react";
import {
  faArrowUpRightFromSquare,
  faExpand,
  faMaximize,
  faMobileScreenButton,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const ViewPage = () => {
  const [selectedScreenSize, setSelectedScreenSize] = useState<
    "mobile" | "normal" | "maximize"
  >("normal");
  const [toggleRefresh, setToggleRefresh] = useState(0);
  const appConfig = useQuery(api.appConfiguration.getAppConfiguration, {
    appId: 1,
  });

  useEffect(() => {
    const handleResize = () => {
      // Tailwind's lg breakpoint is 1280px
      if (window.innerWidth < 1280) {
        setSelectedScreenSize("mobile");
      }
    };

    // Check on mount
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!appConfig) {
    return <div className="text-center text-slate-400 w-full mt-16"></div>;
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
      "hover:text-slate-500 text-slate-400  cursor-pointer": !isSelected,
    });
  };

  return (
    <div className="flex max-md:flex-col" style={{ scrollbarWidth: "none" }}>
      {selectedScreenSize !== "maximize" && (
        <AppSettingsContainer appConfig={appConfig} />
      )}
      <AppView
        appConfig={appConfig}
        selectedScreenSize={selectedScreenSize}
        toggleRefresh={toggleRefresh}
      />

      <div className="max-md:hidden flex flex-col gap-8 text-2xl border-2 border-l-0 py-4 bg-[#fffef5] border-slate-200 w-10 max-w-10 min-w-10 h-full items-center text-slate-400">
        <FontAwesomeIcon
          icon={faMaximize}
          className={screenSizeClasses(selectedScreenSize === "maximize")}
          onClick={() => setSelectedScreenSize("maximize")}
        />
        <FontAwesomeIcon
          icon={faExpand}
          className={screenSizeClasses(selectedScreenSize === "normal")}
          onClick={() => setSelectedScreenSize("normal")}
        />
        <FontAwesomeIcon
          icon={faMobileScreenButton}
          className={screenSizeClasses(selectedScreenSize === "mobile")}
          onClick={() => setSelectedScreenSize("mobile")}
        />
        <a
          href={
            appConfig.testUrl?.startsWith("http")
              ? appConfig.testUrl
              : `http://${appConfig.testUrl}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className={`${screenSizeClasses(false)} text-2xl`}
          />
        </a>
        <FontAwesomeIcon
          icon={faRefresh}
          className={`${screenSizeClasses(false)} text-2xl`}
          onClick={() => setToggleRefresh(toggleRefresh + 1)}
        />
      </div>
    </div>
  );
};

export default ViewPage;
