import Sidebar from "@/dashboard/Sidebar";
import UserProfile from "../auth/UserProfile";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({
  selectedTab,
  setSelectedTab,
  isAuthenticated,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  isAuthenticated: boolean;
}) {
  const [showSidebarIcons, setShowSidebarIcons] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.offsetHeight;
        if (window.scrollY > navbarHeight) {
          setShowSidebarIcons(false);
        } else {
          setShowSidebarIcons(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={navbarRef} className="flex flex-col">
        <div className="px-12 z-10 bg-light py-2 border-b border-slate-200 flex justify-between items-center">
          <div className="text-2xl font-light font-sans text-black">
            SchoolAdmin
          </div>
          {isAuthenticated && (
            <div className="flex gap-2 items-center px-4 py-1.5 border-2 border-slate-200 rounded-full shadow-md">
              <FontAwesomeIcon className="text-slate-500" icon={faBook} />
              <div className="text-sm text-slate-600">
                Learning Management System
              </div>
            </div>
          )}
          <UserProfile />
        </div>
      </div>
      {isAuthenticated && (
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          showSidebarIcons={showSidebarIcons}
        />
      )}
    </>
  );
}
