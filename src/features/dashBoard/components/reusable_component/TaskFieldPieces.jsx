import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { useState, useRef, useEffect } from "react";

function TaskFieldPieces({ handleKeyDown, id, value, handleTextarea }) {
  const [textEditBtn, setTextEditBtn] = useState(false);
  const [isPlaceholder, setPlaceHolder] = useState(false);
  const [isNeedBg, setBg] = useState(false);

  const handleClick = () => {
    setBg(true);
  };

  const textareaRef = useRef(null);

  const handleInput = () => {
    const ele = textareaRef.current;

    // Reset height to recalculate correctly (shrink support)
    ele.style.height = "auto";

    // Set height based on content
    ele.style.height = `${ele.scrollHeight}px`;
  };

  useEffect(() => {
    handleInput(); // initial mount

    window.addEventListener("resize", handleInput);
    return () => window.removeEventListener("resize", handleInput);
  }, []);

  // const handleTextarea = (e) => {
  //   const { name, value } = e.target; // name === textarea id

  //   setNewTask((prev) => ({
  //     ...prev,
  //     textarea: {
  //       ...prev.textarea,
  //       [name]: value,
  //     },
  //   }));
  // };

  return (
    <div
      onMouseOver={() => setTextEditBtn((prev) => !prev)}
      onMouseOut={() => setTextEditBtn((prev) => !prev)}
      onClick={() => setPlaceHolder(true)}
      onBlur={() => setPlaceHolder((pre) => !pre)}
      className=" flex items-center gap-0 my-0.5 w-full  "
    >
      <button
        type="submit"
        onClick={handleClick}
        onBlur={() => setBg((pre) => !pre)}
        className={` px-0 rounded-full  hover:border-2 mr-2 ${
          textEditBtn ? "block" : "hidden"
        }`}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
      </button>

      <textarea
        ref={textareaRef}
        rows={1}
        type="text"
        name={id}
        onInput={handleInput}
        placeholder={isPlaceholder ? "Write here..." : ""}
        onKeyDown={handleKeyDown}
        onChange={handleTextarea}
        value={value}
        className={` focus:bg-sky-100 w-full 
          text-xl
          leading-relaxed
          font-normal
          outline-none
          resize-none
          overflow-hidden
           p-2 pl-0 rounded-lg ${textEditBtn ? " ml-0" : "ml-7"} ${
          isNeedBg ? " bg-sky-100" : "bg-transparent"
        } `}
      />
    </div>
  );
}

export default TaskFieldPieces;

{
  /* <input
        type="text"
        placeholder={isPlaceholder ? "Write here..." : ""}
        onKeyDown={(e) => handleKeyDown(e)}
        className={` text-xl h-auto border-none w-12/12 outline-none  p-2 pl-0 rounded-lg ${
          textEditBtn ? " ml-0" : "ml-7"
        } ${isNeedBg ? " bg-sky-100" : "bg-transparent"}  `}
      /> */
}
