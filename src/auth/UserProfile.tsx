import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import classNames from "classnames";

const UserProfile = () => {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [isOpen, setIsOpen] = useState(false);

  const classes = classNames(
    "w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-dark dark:text-light font-semibold",
    {
      "cursor-default opacity-0": !isAuthenticated,
    },
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={!isAuthenticated}
        className={classes}
      >
        BM
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-light dark:bg-dark rounded-md shadow-lg py-1 border-2 border-slate-200 dark:border-slate-800">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Account
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Settings
          </a>
          <button
            onClick={() => {
              void signOut();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-dark dark:text-light hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
