import TaskFilters from "./MainContent.jsx/TaskFilters";
import TaskList from "./MainContent.jsx/TaskList";

function MainBox({
  allTask,
  handleTaskShowing,
  dispatch,
  openDeleteDrawer,
  handleEdit,
  setSidebarToggle,
  SidebarToggle,
}) {
  return (
    <div className="  overflow-y-auto h-[98vh] flex flex-col  gap-4 mx-8 mb-[2vh] max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0 ">
      <TaskFilters
        dispatch={dispatch}
        SidebarToggle={SidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <TaskList
        allTask={allTask}
        handleTaskShowing={handleTaskShowing}
        openDeleteDrawer={openDeleteDrawer}
        handleEdit={handleEdit} // for edit button in TaskList page
      />
    </div>
  );
}

export default MainBox;
