import DetailsTask from "./TaskdetailsJSX/DetailsTask";
import { useState } from "react";

function TaskDetails({ currentTaskDetails, dispatch, allTask }) {
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
    <div className=" bg-white  rounded-2xl  mx-8 my-5 text-base text-gray-950 p-10  min-h-dvh ">
      <div
        className={`flex items-center justify-between border-b-2 pb-1 mb-2.5`}
      >
        <div>
          <p className=" capitalize font-medium border-r-2 pr-3 mr-3">
            category : {activeTask.category}{" "}
          </p>
        </div>

        <div className=" relative ">
          <button
            type="button"
            onMouseOver={handleStatusDropdown}
            // onMouseOut={() => setStatus((p) => !p)}
            className="rounded-lg capitalize bg-slate-700  px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 "
          >
            Status : {activeTask.status}
          </button>

          <button className=" ml-4 rounded-lg bg-transparent border-slate-700 border-2 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-700 hover:text-white">
            Edit
          </button>

          <div
            onClick={() => setStatus((p) => !p)}
            className={`${
              status
                ? "flex items-center justify-evenly flex-col gap-3 absolute"
                : "hidden"
            } bg-slate-700 mt-1 text-white px-1 capitalize rounded-sm z-10 py-2 `}
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
              className=" hover:border-b border-b-white"
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
              className=" hover:border-b border-b-white"
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
              className=" hover:border-b border-b-white"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
      <div>
        <h4 className=" text-4xl font-bold  text-gray-800 ">
          {activeTask.taskTitle}
        </h4>
        <DetailsTask tasks={tasks} />
      </div>
    </div>
  );
}

export default TaskDetails;
