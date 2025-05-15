import { dataTables } from "@/constants";
import { DataTablesType } from "@/types";
import classNames from "classnames";

const TableCategory = ({
  name,
  isSelected,
  onClick,
}: {
  name: DataTablesType;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const classes = classNames("w-full bg-white flex items-center p-4", {
    "font-semibold": isSelected,
    "hover:bg-slate-100 bg-slate-50 cursor-pointer": !isSelected,
  });

  return (
    <div className="border-b border-slate-200">
      <button className={classes} onClick={onClick}>
        <span className="text-slate-600">{name}</span>
      </button>
    </div>
  );
};

const DataTables = ({
  selectedTable,
  setSelectedTable,
}: {
  selectedTable: DataTablesType;
  setSelectedTable: (table: DataTablesType) => void;
}) => {
  return (
    <div className="bg-white border-2 border-r-1 border-slate-200">
      <div className="w-96 relative">
        {dataTables.map((table) => (
          <TableCategory
            key={table}
            name={table}
            isSelected={selectedTable === table}
            onClick={() => setSelectedTable(table)}
          />
        ))}
      </div>
    </div>
  );
};

export default DataTables;
