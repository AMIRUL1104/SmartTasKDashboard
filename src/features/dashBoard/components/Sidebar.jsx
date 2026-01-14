import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchField from "./reusable_component/SearchField";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function Sidebar({ SidebarToggle, allTask, handleTaskShowing }) {
  return (
    <div
      className={`
     m-5 max-h-screen
    flex flex-col gap-6
    overflow-hidden
    rounded-2xl border-2 border-gray-300 bg-cyan-950 p-4
    transition-all duration-300 ease-in-out
    ${SidebarToggle ? "w-60 translate-x-0" : "w-0 -translate-x-full"}
  `}
    >
      <SearchField />
      <button
        type="submit"
        className="  hover:text-cyan-700  bg-gray-300 p-1.5 rounded-2xl  flex justify-between w-full px-2.5 items-center capitalize font-bold text-cyan-900"
      >
        <span className="text-cyan-900  hover:text-cyan-700">profile</span>{" "}
        <FontAwesomeIcon icon={["fas", "user"]} />
      </button>

      {/* <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} /> */}

      <div className=" p-1.5 rounded-2xl w-full px-2.5  capitalize text-sm text-black">
        <h3 className=" font-bold text-white  text-2xl">Pages</h3>
        <div className=" overflow-auto">
          {
            allTask.map((task) => {
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
            })

            /* <li className=" bg-gray-300 rounded-2xl my-2.5 px-2">one</li>
          <li className=" bg-gray-300 rounded-2xl my-2.5 px-2">three</li> */
          }
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
