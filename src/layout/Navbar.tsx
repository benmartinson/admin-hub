import UserProfile from "../auth/UserProfile";

export default function Navbar() {
  return (
    <div className="pl-12 z-10 bg-light p-4 border-b border-slate-200 flex justify-between items-center">
      <div className="text-2xl font-semibold font-sans text-black">
        AdminHub
      </div>
      <UserProfile />
    </div>
  );
}
