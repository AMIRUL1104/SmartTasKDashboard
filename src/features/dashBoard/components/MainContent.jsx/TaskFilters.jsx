import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import SortDropdown from "./SortDropdown";
import MenuBar from "../reusable_component/MenuBar";
import WebIcon from "../reusable_component/WebIcon";
function TaskFilters({ dispatch, setSidebarToggle, SidebarToggle }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-xl  px-4 shadow-md ${SidebarToggle ? "py-0" : "py-4"} `}
    >
      <div
        className={` ${SidebarToggle ? " invisible" : "flex"} items-center justify-start gap-3 `}
      >
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>
      <div className="flex flex-wrap items-center justify-around gap-3">
        <CategoryFilter dispatch={dispatch} />
        <StatusFilter dispatch={dispatch} />
        <PriorityFilter dispatch={dispatch} />
        <SortDropdown dispatch={dispatch} />
      </div>
    </div>
  );
}

export default TaskFilters;
