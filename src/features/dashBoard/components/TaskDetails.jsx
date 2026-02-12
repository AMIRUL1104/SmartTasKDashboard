import DetailsTask from "./TaskdetailsJSX/DetailsTask";
import MenuBar from "./reusable_component/MenuBar";
import { useState } from "react";

function TaskDetails({
  currentTaskDetails,
  dispatch,
  allTask,
  handleEdit,
  SidebarToggle,
  setSidebarToggle,
}) {
  const [status, setStatus] = useState(false);
  const handleStatusDropdown = () => {
    setStatus((p) => !p);
  };

  // this task are show on main section
  let activeTask = allTask.find((item) => {
    return item.id === currentTaskDetails;
  });

  const tasks = activeTask.textarea; //tasks is going to detailstask component

  return (
    <div
      className={`relative mt-2.5 flex items-start justify-start flex-col text-base bg-gray-100 text-gray-950 py-10 h-full overflow-auto ${
        SidebarToggle ? "px-10 max-sm:px-2.5" : "px-2.5 md:px-28 lg:px-48"
      } max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0`}
    >
      <div
        className={`absolute top-0 border-b-2 py-1.5 border-gray-600 flex items-center justify-between ${
          SidebarToggle ? "w-10/12 max-md:w-full" : "w-9/12 max-md:w-full"
        } max-md:px-8`}
      >
        <div className="flex items-center justify-start gap-10">
          <span
            className={`${SidebarToggle ? "hidden" : "flex"} items-center -ml-6`}
          >
            <MenuBar setSidebarToggle={setSidebarToggle} />
          </span>

          <p className="capitalize font-normal text-cyan-900 max-xs:text-sm max-xs:hidden">
            Category : {activeTask.category}
          </p>
        </div>

        <div className="relative space-x-3">
          <button
            type="button"
            onMouseOver={handleStatusDropdown}
            className="rounded-lg bg-slate-700 max-xs:text-sm max-xs:px-1 max-xs:py-0.5 max-xs:rounded-sm px-3.5 py-1 text-sm font-normal text-white hover:bg-slate-600 capitalize"
          >
            Status : {activeTask.status}
          </button>

          <button
            type="button"
            id={activeTask.id}
            onClick={handleEdit}
            className="rounded-lg border bg-gray-300 max-xs:text-sm max-xs:px-2 max-xs:py-0.5 max-xs:rounded-sm  px-3.5 py-1 text-sm font-semibold text-cyan-900 hover:shadow hover:shadow-amber-50 hover:text-cyan-700"
          >
            Edit
          </button>

          <div
            onClick={() => setStatus((p) => !p)}
            className={`${
              status
                ? "flex items-center justify-evenly flex-col gap-3 absolute"
                : "hidden"
            } bg-slate-700 mt-1 text-white px-2 capitalize rounded-sm z-10 py-2`}
          >
            <button
              type="button"
              value={"pending"}
              onClick={() => {
                dispatch({
                  type: "SET_TASK_STATUS",
                  payload: { id: activeTask.id, status: "pending" },
                });
              }}
              className="hover:border-b border-b-white"
            >
              Pending
            </button>

            <button
              type="button"
              value={"in-progress"}
              onClick={() => {
                dispatch({
                  type: "SET_TASK_STATUS",
                  payload: { id: activeTask.id, status: "in progress" },
                });
              }}
              className="hover:border-b border-b-white"
            >
              In Progress
            </button>

            <button
              type="button"
              value={"completed"}
              onClick={() => {
                dispatch({
                  type: "SET_TASK_STATUS",
                  payload: { id: activeTask.id, status: "completed" },
                });
              }}
              className="hover:border-b border-b-white"
            >
              Complete
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <h4 className="w-full text-3xl max-sm:text-2xl leading-relaxed font-semibold rounded-xl px-4 mb-5 bg-gray-100 text-gray-800">
          {activeTask.taskTitle}
        </h4>

        <DetailsTask tasks={tasks} />
      </div>
    </div>
  );
}

export default TaskDetails;
