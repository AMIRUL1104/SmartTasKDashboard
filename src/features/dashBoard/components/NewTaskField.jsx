import { useState } from "react";
import TaskFieldPieces from "./reusable_component/TaskFIeldPieces.JSX";
function NewTaskField() {
  const [taskField, setTaskField] = useState([{ id: 1, value: "" }]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTaskField((prev) => [...prev, { id: Date.now(), value: "" }]);
    }
  };
  taskField.map((t) => console.log(`${t.id} and value is : ${t.value}`));
  return (
    <div className="mx-8 my-5 text-base bg-gray-100 text-gray-950 p-10 rounded-2xl ">
      <input
        type="text"
        name=""
        placeholder="New Page"
        className=" text-4xl h-auto border-none w-12/12 outline-none bg-transparent font-bold hover:bg-gray-200 p-2 rounded-lg "
      />

      {taskField.map((field) => (
        <TaskFieldPieces handleKeyDown={handleKeyDown} key={field.id} />
      ))}
    </div>
  );
}

export default NewTaskField;

//   const [inputs, setInputs] = useState([""]);

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       setInputs([...inputs, ""]);
//     }
//   };

/* {inputs.map((value, index) => (
        <input
          key={index}
          onKeyDown={(e) => handleKeyDown(e, index)}
          placeholder={`Task ${index + 1}`}
        />
      ))} */
