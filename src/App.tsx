import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import SignInForm from "./auth/SignInForm";
import UserProfile from "./auth/UserProfile";
import LoadingSpinner from "./common/LoadingSpinner";
import AppsList from "./apps/AppsList";
import Sidebar from "./dashboard/Sidebar";

export default function App() {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return (
      <>
        <header className="sticky top-0 z-10 bg-light dark:bg-dark p-4 border-b-2 border-slate-200 dark:border-slate-800 flex justify-between items-center">
          AdminHub
          <UserProfile />
        </header>
        <main className="p-8 flex flex-col gap-16">
          <LoadingSpinner />
        </main>
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-light dark:bg-dark p-4 border-b-2 border-slate-200 dark:border-slate-800 flex justify-between items-center">
        AdminHub
        <UserProfile />
      </header>
      <main className="flex">
        <h1 className="text-4xl font-bold text-center"></h1>
        <Authenticated>
          <div className="flex gap-4">
            <Sidebar />
            <div></div>
          </div>
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}
