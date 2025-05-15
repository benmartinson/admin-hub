import Sidebar from "@/dashboard/Sidebar";
import UserProfile from "../auth/UserProfile";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Navbar({
  isAuthenticated,
}: {
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
      navigate("/dashboard/view");
    } else {
      navigate("/dashboard/view");
    }
  };

  const isAccountPage = location.pathname.includes("/account");

  const logoContent = (
    <div className="text-2xl font-light font-sans text-black">SchoolAdmin</div>
  );

  return (
    <>
      <div ref={navbarRef} className="flex flex-col">
        <div className="relative px-12 z-30 bg-light py-2 border-b border-slate-200 flex justify-between items-center">
          <div className="flex w-1/3 justify-start">
            {isAccountPage ? (
              <div className="cursor-pointer" onClick={handleLogoClick}>
                {logoContent}
              </div>
            ) : (
              <Link to="/dashboard/view">{logoContent}</Link>
            )}
          </div>
          <div className="flex w-1/3 justify-center">
            {isAuthenticated && (
              <div className="flex gap-2 items-center px-4 py-1.5 border-2 border-slate-200 rounded-full shadow-md">
                <FontAwesomeIcon className="text-slate-500" icon={faBook} />
                <div className="text-sm text-slate-600">
                  Learning Management System
                </div>
              </div>
            )}
          </div>
          <div className="flex w-1/3 justify-end">
            <UserProfile />
          </div>
        </div>
      </div>
      {isAuthenticated && !isAccountPage && (
        <Sidebar showSidebarIcons={showSidebarIcons} />
      )}
    </>
  );
}
