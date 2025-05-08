import { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<string>("Playground");

  return (
    <div className="flex flex-col">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="flex h-screen w-full bg-white"></div>
    </div>
  );
}
