import AppSettings from "./AppSettings";
import AppView from "./AppView";

const ViewPage = () => {
  return (
    <div className="p-12 pt-4">
      <div className="flex p-2 items center text-slate-400">
        Adjust the settings for the app
      </div>
      <div className="flex" style={{ scrollbarWidth: "none" }}>
        <AppSettings />
        <AppView />
      </div>
    </div>
  );
};

export default ViewPage;
