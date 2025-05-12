import Sidebar from "@/dashboard/Sidebar";
import UserProfile from "../auth/UserProfile";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogoClick = () => {
    if (isAccountPage) {
      navigate("/dashboard");
      setSelectedTab("View");
    }
  };

  const isAccountPage = location.pathname.includes("/account");

  const logoClasses = classNames("text-2xl font-light font-sans text-black", {
    "cursor-pointer": isAccountPage,
  });

  return (
    <>
      <div ref={navbarRef} className="flex flex-col">
        <div className="relative px-12 z-30 bg-light py-2 border-b border-slate-200 flex justify-between items-center">
          <div className={logoClasses} onClick={handleLogoClick}>
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
      {isAuthenticated && !isAccountPage && (
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          showSidebarIcons={showSidebarIcons}
        />
      )}
    </>
  );
}
