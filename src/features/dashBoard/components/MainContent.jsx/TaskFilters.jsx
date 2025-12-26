import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortDropdown from "./SortDropdown";

function TaskFilters() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl  p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-around gap-3">
        <CategoryFilter />
        <StatusFilter />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-3">
        <PriorityFilter />
        <SortDropdown />
      </div>
    </div>
  );
}

export default TaskFilters;
