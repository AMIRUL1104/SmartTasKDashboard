import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { useState, useEffect } from "react";

const TaskFieldPieces = forwardRef(
  (
    { handleKeyDown, id, value, handleTextarea, handleInput, handleTitlePast },
    ref,
  ) => {
    const [textEditBtn, setTextEditBtn] = useState(false);
    const [isPlaceholder, setPlaceHolder] = useState(false);
    const [isNeedBg, setBg] = useState(false);

    const handleClick = () => {
      setBg(true);
      // console.log(e.target.id);
    };

    useEffect(() => {
      handleInput; // initial mount

      window.addEventListener("resize", handleInput);
      return () => window.removeEventListener("resize", handleInput);
    });

    return (
      <div
        onMouseOver={() => setTextEditBtn((prev) => !prev)}
        onMouseOut={() => setTextEditBtn((prev) => !prev)}
        onFocus={() => setPlaceHolder(true)}
        onBlur={() => setPlaceHolder((pre) => !pre)}
        className=" flex items-center gap-0 my-2 w-full "
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
          ref={ref}
          rows={1}
          type="text"
          name={id}
          id={id}
          onClick={handleClick}
          onInput={handleInput}
          placeholder={isPlaceholder ? "Write here..." : ""}
          onKeyDown={handleKeyDown}
          onChange={handleTextarea}
          onPaste={handleTitlePast}
          value={value}
          className={` focus:bg-sky-100 w-full 
          text-xl
          leading-relaxed
          font-normal
          outline-none
          resize-none
          overflow-hidden
           p-2 pl-0 rounded-lg ${textEditBtn ? " ml-0" : "ml-7"} ${
             isNeedBg ? " bg-sky-300" : "bg-transparent"
           } `}
        />
      </div>
    );
  },
);

export default TaskFieldPieces;
