import TaskFilters from "./MainContent.jsx/TaskFilters";
import TaskList from "./MainContent.jsx/TaskList";

function MainBox({
  allTask,
  handleTaskShowing,
  handleFiltering,
  openDeleteDrawer,
}) {
  return (
    <div className="  max-h-[88vh] overflow-y-auto mb-0  max-md:mx-auto max-md:min-w-dvw max-md:px-2.5 mx-8 my-5 flex flex-col  gap-6">
      <TaskFilters handleFiltering={handleFiltering} />
      <TaskList
        allTask={allTask}
        handleTaskShowing={handleTaskShowing}
        openDeleteDrawer={openDeleteDrawer}
      />
    </div>
  );
}

export default MainBox;
