import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
function AddPageBtn({ setNewTaskPageToggle }) {
  return (
    <button
      type="submit"
      onClick={() => setNewTaskPageToggle((previus) => !previus)}
      className="hover:shadow hover:shadow-amber-50 hover:text-cyan-700 bg-gray-300 p-1.5 rounded-2xl  flex justify-between w-auto px-2.5 items-center capitalize font-bold text-cyan-900"
    >
      <span className=" mr-2.5">add page</span>{" "}
      <FontAwesomeIcon icon={["fas", "plus"]} className=" font-extrabold" />
    </button>
  );
}

export default AddPageBtn;
