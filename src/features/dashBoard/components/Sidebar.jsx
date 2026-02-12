import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import WebIcon from "./reusable_component/WebIcon";
import MenuBar from "./reusable_component/MenuBar";

import AddPageBtn from "./sideBar/AddPageBtn";
import RemovePage from "./sideBar/RemovePage";
import CloseTaskDetails from "./sideBar/CloseTaskDetails";

import SearchField from "./sideBar/SearchField";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function Sidebar({
  SidebarToggle,
  allTask,
  handleTaskShowing,
  dispatch,
  setSidebarToggle,
  mainSectionToggle,
  setMainSectionToggle,
}) {
  let content;
  if (mainSectionToggle === "newTaskPage") {
    content = <RemovePage setMainSectionToggle={setMainSectionToggle} />;
  } else if (mainSectionToggle === "taskDetails") {
    content = <CloseTaskDetails setMainSectionToggle={setMainSectionToggle} />;
  } else {
    content = <AddPageBtn setMainSectionToggle={setMainSectionToggle} />;
  }

  return (
    <div
      className={`
         h-[98vh]
        mb-[2vh]
        flex flex-col gap-6
        overflow-hidden      
       bg-cyan-950 p-4
        transition
        duration-300
        ease-in-out
        opacity-100
       
      ${SidebarToggle ? "w-60 max-md:absolute max-md:left-0 max-md:top-0 z-50" : "w-0"}
    `}
    >
      <div className="flex items-center justify-start gap-3">
        <WebIcon />
        <MenuBar setSidebarToggle={setSidebarToggle} />
      </div>

      {/* Profile button */}
      <button
        type="submit"
        className="  hover:text-cyan-700  bg-gray-300 p-1.5 rounded-2xl  flex justify-between w-full px-2.5 items-center capitalize font-bold text-cyan-900"
      >
        <span className="text-cyan-900  hover:text-cyan-700">profile</span>{" "}
        <FontAwesomeIcon icon={["fas", "user"]} />
      </button>

      {/* add newpage , close page or remove page button */}
      {content}

      {/* // <div className="h-full px-4 py-6 space-y-6 text-sm"> */}
      <SearchField dispatch={dispatch} />

      {/* <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} /> */}

      <div
        className=" p-1.5 rounded-2xl w-full px-2.5  capitalize text-sm text-black"
        // className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer transition"
      >
        <h3 className=" font-bold text-white  text-2xl">Pages</h3>
        <div className=" h-[63vh] mt-2.5 hover:overflow-y-auto overflow-y-hidden">
          {allTask.map((task) => {
            let title = task.taskTitle;

            if (title.length > 17) {
              const cutTitle = title.slice(0, 18) + "...";
              return (
                <button
                  key={task.id}
                  id={task.id}
                  onClick={handleTaskShowing}
                  className=" bg-gray-300 w-full rounded-2xl my-2.5 px-2 py-1 text-left  "
                >
                  {cutTitle}
                </button>
              );
            } else {
              return (
                <button
                  key={task.id}
                  id={task.id}
                  onClick={handleTaskShowing}
                  className="  bg-gray-300 w-full rounded-2xl my-2.5 px-2 py-1 text-left "
                >
                  {title}{" "}
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
