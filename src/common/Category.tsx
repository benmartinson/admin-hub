import { ChevronDown, ChevronRight } from "lucide-react";

interface CategoryProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const Category = ({ title, children, isExpanded, onToggle }: CategoryProps) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center p-4 bg-slate-50 hover:bg-slate-100"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 mr-2" />
        ) : (
          <ChevronRight className="w-4 h-4 mr-2" />
        )}
        <span className="font-medium text-slate-600">{title}</span>
      </button>
      {isExpanded && children}
    </div>
  );
};

export default Category;
