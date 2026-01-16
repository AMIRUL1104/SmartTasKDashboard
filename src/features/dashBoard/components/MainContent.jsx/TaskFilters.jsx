import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortDropdown from "./SortDropdown";

function TaskFilters({ handleFiltering }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl  p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-around gap-3">
        <CategoryFilter handleFiltering={handleFiltering} />
        <StatusFilter handleFiltering={handleFiltering} />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-3">
        <PriorityFilter handleFiltering={handleFiltering} />
        <SortDropdown />
      </div>
    </div>
  );
}

export default TaskFilters;
