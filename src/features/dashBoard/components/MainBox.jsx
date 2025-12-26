import TaskFilters from "./MainContent.jsx/TaskFilters";
import TaskList from "./MainContent.jsx/TaskList";

function MainBox() {
  return (
    <div className=" mx-8 my-5 flex flex-col gap-6">
      <h2 className=" capitalize text-3xl font-bold text-center">
        welcome amirul
      </h2>

      <TaskFilters />
      <TaskList />
    </div>
  );
}

export default MainBox;
