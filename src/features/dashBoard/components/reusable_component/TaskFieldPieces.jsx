import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function TaskFieldPieces({ handleKeyDown }) {
  return (
    <div className=" flex items-center gap-0 my-0.5 ">
      <button
        type="submit"
        className=" hover:text-gray-500 px-1 rounded-full  hover:border-2"
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
      </button>
      <input
        type="text"
        placeholder={` write here...`}
        onKeyDown={(e) => handleKeyDown(e)}
        className=" h-auto border-none w-12/12 outline-none bg-transparent hover:bg-gray-200 p-2 rounded-lg "
      />
    </div>
  );
}

export default TaskFieldPieces;
