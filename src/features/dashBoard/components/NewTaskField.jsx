import { useState, useRef } from "react";
import TaskFieldPieces from "./reusable_component/TaskFIeldPieces.JSX";
function NewTaskField({ addTask, setNewTaskPageToggle }) {
  const [taskField, setTaskField] = useState([{ id: 1 }]);

  const handleInput = () => {
    const el = textareaRef.current;

    // Reset height to recalculate correctly (shrink support)
    el.style.height = "auto";

    // Set height based on content
    el.style.height = `${el.scrollHeight}px`;
  };
  const textareaRef = useRef(null);

  const [newTask, setNewTask] = useState({
    title: "",
    textarea: {}, // dynamic, many values
    category: "all",
    status: "Pending",
    priority: "Medium",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const id = crypto.randomUUID();
      setTaskField((prev) => [...prev, { id: id }]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewTask({
      ...newTask,
      [key]: value,
    });
  };
  const handleTextarea = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      textarea: {
        ...prev.textarea,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTaskPageToggle((previus) => !previus);
  };

  // console.log(newTask);

  return (
    <form
      name="newTaskForm"
      onSubmit={handleSubmit}
      className=" relative mx-8 my-5 text-base bg-gray-100 text-gray-950 p-10 rounded-2xl min-h-3/4 "
    >
      <textarea
        name="title"
        value={newTask.title}
        onChange={handleChange}
        ref={textareaRef}
        rows={1}
        type="text"
        onInput={handleInput}
        placeholder="New Page"
        className="
      
          w-full
          text-4xl
          leading-relaxed
          bg-gray-100
          rounded-xl
          font-bold
          outline-none
          resize-none
          overflow-hidden      
        "
      />

      {taskField.map((field) => (
        <TaskFieldPieces
          handleTextarea={handleTextarea}
          handleKeyDown={handleKeyDown}
          value={newTask.textarea[field.id] || ""}
          key={field.id}
          id={field.id}
        />
      ))}

      <div className=" border-t-4 border-gray-600 pt-1.5 mt-2.5 absolute bottom-2 flex items-baseline justify-evenly w-11/12 ">
        <button
          type="submit"
          className="  hover:shadow hover:shadow-amber-50 hover:text-cyan-700 bg-gray-300 p-1.5 rounded-lg   px-3.5  capitalize font-bold text-cyan-900"
        >
          Save
        </button>

        <select
          name="category"
          value={newTask.category}
          onChange={handleChange}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
        >
          <option value="all" className=" mt-2.5">
            Categories
          </option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>

        <select
          name="status"
          value={newTask.status}
          onChange={handleChange}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
        >
          <option value="all" className=" mt-2.5">
            Status
          </option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
        </select>

        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white outline-none ring-1 ring-slate-600 focus:ring-2 focus:ring-red-500"
        >
          <option value={"high"}>High</option>
          <option value={"medium"}>Medium</option>
          <option value={"low"}>Low</option>
        </select>
      </div>
    </form>
  );
}

export default NewTaskField;
