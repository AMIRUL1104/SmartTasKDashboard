import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchField from "./reusable_component/SearchField";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import AddPageBtn from "./reusable_component/AddPageBtn";
function Sidebar({ SidebarToggle, setNewTaskPageToggle }) {
  return (
    <div
      className={`
     m-5
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

      <AddPageBtn setNewTaskPageToggle={setNewTaskPageToggle} />

      <div className=" p-1.5 rounded-2xl w-full px-2.5  capitalize text-sm text-black">
        <h3 className=" font-bold text-white  text-2xl">Pages</h3>
        <ul>
          <li className=" bg-gray-300 rounded-2xl my-2.5 px-2">one</li>
          <li className=" bg-gray-300 rounded-2xl my-2.5 px-2">two</li>
          <li className=" bg-gray-300 rounded-2xl my-2.5 px-2">three</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
