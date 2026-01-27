import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortDropdown from "./SortDropdown";

function TaskFilters({ dispatch }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl  p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-around gap-3">
        <CategoryFilter dispatch={dispatch} />
        <StatusFilter dispatch={dispatch} />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-3">
        <PriorityFilter dispatch={dispatch} />
        <SortDropdown dispatch={dispatch} />
      </div>
    </div>
  );
}

export default TaskFilters;
