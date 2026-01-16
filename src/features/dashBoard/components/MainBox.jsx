import TaskFilters from "./MainContent.jsx/TaskFilters";
import TaskList from "./MainContent.jsx/TaskList";

function MainBox({ allTask, handleTaskShowing, handleFiltering }) {
  return (
    <div className=" mx-8 my-5 flex flex-col gap-6">
      <TaskFilters handleFiltering={handleFiltering} />
      <TaskList allTask={allTask} handleTaskShowing={handleTaskShowing} />
    </div>
  );
}

export default MainBox;
