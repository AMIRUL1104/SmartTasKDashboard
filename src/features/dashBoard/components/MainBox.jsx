import TaskFilters from "./MainContent.jsx/TaskFilters";
import TaskList from "./MainContent.jsx/TaskList";

function MainBox({
  allTask,
  handleTaskShowing,
  dispatch,
  openDeleteDrawer,
  handleEdit,
}) {
  return (
    <div className=" h-full overflow-y-auto mb-0  max-md:mx-auto max-md:min-w-dvw max-md:px-2.5 mx-8 my-5 flex flex-col  gap-6">
      <TaskFilters dispatch={dispatch} />
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
