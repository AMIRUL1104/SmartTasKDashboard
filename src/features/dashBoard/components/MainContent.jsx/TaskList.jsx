import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { useState } from "react";

function TaskList({ allTask, handleTaskShowing }) {
  const [EditDeleteVisible, setEditDeleteVisible] = useState(null);

  const handleEditDeleteVisible = (e) => {
    let id = e.target.id;
    if (id === EditDeleteVisible) {
      return setEditDeleteVisible(null);
    }
    setEditDeleteVisible(id);
  };

  return (
    // <div>
    <div className=" mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {allTask.map((task) => (
        <div
          key={task.id}
          id={task.id}
          // onClick={handleTaskShowing}
          className=" bg-cyan-900 h-45 overflow-clip p-2.5 shadow-md shadow-cyan-950 rounded-lg "
        >
          <div className=" flex justify-between items-center relative ">
            <h3
              id={task.id}
              onClick={handleTaskShowing}
              className=" text-2xl font-medium  min-w-11/12"
            >
              {task.taskTitle}
            </h3>

            <div className="relative">
              <button type="button" className=" rounded-full ">
                <FontAwesomeIcon
                  icon={"ellipsis-vertical"}
                  id={task.id}
                  onClick={handleEditDeleteVisible}
                  className=" hover:bg-cyan-700 rounded-full p-1.5 py-2"
                />
              </button>

              <div
                className={`${
                  EditDeleteVisible === task.id
                    ? "absolute flex items-center justify-evenly flex-col-reverse gap-0.5"
                    : "hidden"
                } border -ml-16  py-1.5 rounded`}
                // className=" hidden  border -ml-16  py-1.5 rounded "
              >
                <button
                  type="button"
                  className=" text-red-600 hover:font-semibold hover:text-red-500"
                >
                  Delete <FontAwesomeIcon icon={"trash"} />
                </button>
                <button
                  type="button"
                  className=" font-sm  px-2.5 min-w-16 hover:font-semibold hover:text-slate-300"
                >
                  Edit{" "}
                  <FontAwesomeIcon icon={"pen-to-square"} className=" ml-1" />
                </button>
              </div>
            </div>
          </div>
          <p
            id={task.id}
            onClick={handleTaskShowing}
            className="my-2  min-h-9/12  rounded"
          >
            {task.textarea.map((e) => {
              if (e.id === "2") {
                const text = e.value;
                const words = text.split(" ");
                return words.length > 30
                  ? words.slice(0, 30).join(" ") + "  . . ."
                  : text;
              }
            })}
          </p>
        </div>
      ))}
    </div>
    // </div>
  );
}

export default TaskList;
