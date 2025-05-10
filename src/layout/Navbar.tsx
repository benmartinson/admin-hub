import Sidebar from "@/dashboard/Sidebar";
import UserProfile from "../auth/UserProfile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) {
  return (
    <div className="flex flex-col sticky top-0">
      <div className="px-12 z-10 bg-light p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="text-2xl font-light font-sans text-black">
          SchoolAdmin
        </div>
        <div className="flex gap-2 items-center px-4 py-2 border-2 border-slate-200 rounded-full shadow-md">
          <FontAwesomeIcon className="text-slate-500" icon={faBook} />
          <div className="text-md font-medium">Learning Management System</div>
        </div>
        <UserProfile />
      </div>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}
