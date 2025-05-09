const AppView = () => {
  return (
    <div className="flex h-screen w-full bg-white flex-3 border border-slate-200">
      <iframe
        src="http://localhost:5174/class/jn7b7h4tb5vm4std60sfddkjfn7f9yb9/gradebook"
        className="w-full h-full border-0"
        title="Gradebook"
      />
    </div>
  );
};

export default AppView;
