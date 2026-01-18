import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
function AddPageBtn({ setNewTaskPageToggle }) {
  return (
    <button
      type="submit"
      onClick={() => setNewTaskPageToggle("newTaskPage")}
      className=" max-sm:text-sm max-sm:px-2 max-sm:py-1 max-xs:text-sm max-xs:py-0.5 max-xs:font-medium  hover:shadow hover:shadow-amber-50 hover:text-cyan-700 bg-gray-300 p-1.5  rounded-2xl  flex justify-between w-auto px-2.5 items-center capitalize font-bold text-cyan-900"
    >
      <span className=" mr-2.5 max-xs:mr-1.5">new page</span>{" "}
      <FontAwesomeIcon
        icon={["fas", "plus"]}
        className=" font-extrabold max-xs:font-normal max-xs:text-sm"
      />
    </button>
  );
}

export default AddPageBtn;
