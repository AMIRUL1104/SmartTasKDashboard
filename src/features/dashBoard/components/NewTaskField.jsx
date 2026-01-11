import { useState, useRef, useEffect } from "react";
import TaskFieldPieces from "./reusable_component/TaskFIeldPieces.JSX";
function NewTaskField({ addTask, setNewTaskPageToggle }) {
  //all useState Hooks
  const [taskField, setTaskField] = useState([{ id: "2" }]); //using for rendering TaskFiedPieces OR dynamic textarea and all id is using on textarea id
  const [focusId, setFocusId] = useState(null); // for textarea  focus control
  const [newTask, setNewTask] = useState({
    title: "",
    textarea: [{ id: "2", value: "" }], // dynamic, many values
    category: "all",
    status: "pending",
    priority: "all",
  }); // new task values catcher

  // console.log(newTask.textarea);

  // all useRef Hooks
  const textareaRefs = useRef({}); //this hooks mostly used on dynamic textarea handling
  const newTextareaIdRef = useRef("2"); //last created textarea id stored in this ref

  const keydownedTextareaIdRef = useRef(null); //last created textarea id stored in this ref

  const newTaskTitleRefs = useRef({});

  //textarea typing time actions are handle by this functin
  const handleInput = (e) => {
    const id = e.target.id;

    if (id == 1) {
      const a = newTaskTitleRefs.current;
      a.style.height = "auto";
      a.style.height = `${a.scrollHeight}px`;
    }
    const el = textareaRefs.current[id];
    if (!el) return;
    // Reset height to recalculate correctly (shrink support)
    el.style.height = "auto";
    // Set height based on content
    el.style.height = `${el.scrollHeight}px`;
  };

  //this function handle  all keyboard keys action like Enter,Arrows,Backspace etc
  const handleKeyDown = (e) => {
    const id = crypto.randomUUID(); // new textarea id

    const keydownedId = e.target.id;
    const keydownedTextAreaIndex = newTask.textarea.findIndex(
      (item) => item.id == keydownedId
    );

    const keydownedTextarea = e.target;
    const keydownedTextareaValue = e.target.value;
    const cursorPositionStart = keydownedTextarea.selectionStart;

    if (e.key === "Enter" && e.target.name === "title") {
      e.preventDefault();
      textareaRefs.current["2"].focus();
      newTextareaIdRef.current["2"];
    } else if (e.key === "Enter" && e.target.name !== "title") {
      e.preventDefault();

      newTextareaIdRef.current = id; // latest textarea id store in ref
      keydownedTextareaIdRef.current = keydownedId;

      // keydowned Textarea value
      const slicedKeydownedTextareaCursorInfrontValue =
        keydownedTextareaValue.slice(0, cursorPositionStart);
      // new Textarea  value
      const slicedKeydownedTextareaCursorBehindValue =
        keydownedTextareaValue.slice(cursorPositionStart);

      // keydownedId Textarea value setting
      setNewTask((prev) => ({
        ...prev,
        textarea: prev.textarea.map((t) =>
          t.id === keydownedId
            ? { ...t, value: slicedKeydownedTextareaCursorInfrontValue }
            : t
        ),
      }));

      // new Textarea id and value set on newtask textarea array
      setNewTask((prev) => {
        const newTextarea = {
          id: id,
          value: slicedKeydownedTextareaCursorBehindValue,
        };

        const updated = [...prev.textarea];

        updated.splice(keydownedTextAreaIndex + 1, 0, newTextarea);
        // console.log("updated : " + updated);

        return {
          ...prev,
          textarea: updated,
        };
      });

      setTaskField((prev) => [...prev, { id: id }]);

      setFocusId(id);
      // console.log(focusId);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // console.log(keydownedId);

      if (e.target.name === "title") return textareaRefs.current["2"].focus();

      const nextTextareaIndex = keydownedTextAreaIndex + 1;

      const nextTextarea = newTask.textarea.find(
        (value, index) => index === nextTextareaIndex
      );
      if (!nextTextarea) return;
      setFocusId(nextTextarea.id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      const nextTextareaIndex = keydownedTextAreaIndex - 1;

      const nextTextarea = newTask.textarea.find(
        (value, index) => index === nextTextareaIndex
      );

      if (!nextTextarea) return newTaskTitleRefs.current.focus();
      setFocusId(nextTextarea.id);
    } else if (e.key === "Backspace") {
      // const zeroToPositionStart = keydownedTextareaValue.slice(
      //   0,
      //   cursorPositionStart
      // );
      if (keydownedTextareaValue.length === 0) {
        let updated = [...newTask.textarea];
        updated = newTask.textarea.filter((item) => item.id !== keydownedId);
        setNewTask((prev) => {
          return {
            ...prev,
            textarea: updated,
          };
        });

        const nextTextareaIndex = keydownedTextAreaIndex - 1;
        const nextTextarea = newTask.textarea.find(
          (value, index) => index === nextTextareaIndex
        );

        if (!nextTextarea) return newTaskTitleRefs.current.focus();
        setFocusId(nextTextarea.id);
      }
      // if (zeroToPositionStart.length === 0) {
      //   const nextTextareaIndex = keydownedTextAreaIndex - 1;

      //   const nextTextarea = newTask.textarea.find(
      //     (value, index) => index === nextTextareaIndex
      //   );

      //   const id = nextTextarea.id;
      //   console.log(id);
      //   const value = e.target.value;

      //   setNewTask((prev) => ({
      //     ...prev,
      //     textarea: prev.textarea.map((t) =>
      //       t.id === id ? { ...t, value: t.value + value } : t
      //     ),
      //   }));
      //   console.log(value);

      //   let updated = [...newTask.textarea];
      //   updated = newTask.textarea.filter((item) => item.id !== keydownedId);
      //   setNewTask((prev) => {
      //     return {
      //       ...prev,
      //       textarea: updated,
      //     };
      //   });

      //   if (!nextTextarea) return newTaskTitleRefs.current.focus();
      //   setFocusId(nextTextarea.id);
      // }
    }
  };

  // const splitedKeydownedTextareaValue = keydownedTextareaValue.split("");
  // const end = keydownedTextareaValue.length;
  // console.log(slicedKeydownedTextareaCursorBehindValue);
  // console.log(keydownedTextareaValue);
  // const cursorPositionEnd = keydownedTextarea.selectionEnd;
  // console.log(
  //   "Start : " + cursorPositionStart + "end : " + cursorPositionEnd
  // );

  //Task title ,cetagories ,status , priority etc. properties value catching function
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewTask({
      ...newTask,
      [key]: value,
    });
  };

  //dynamically create all text area Value Catching Function
  const handleTextarea = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setNewTask((prev) => ({
      ...prev,
      textarea: prev.textarea.map((t) =>
        t.id === id ? { ...t, value: value } : t
      ),
    }));
  };

  //new task submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTaskPageToggle((previus) => !previus);
  };

  useEffect(() => {
    newTaskTitleRefs.current.focus();
  }, [taskField]);

  useEffect(() => {
    if (focusId && textareaRefs.current[focusId]) {
      textareaRefs.current[focusId].focus();
    }
  }, [taskField, focusId]);

  useEffect(() => {
    let id = newTextareaIdRef.current;
    if (!id) return;
    const el = textareaRefs.current[id];
    // console.log(el);
    if (!el) return;
    // Reset height to recalculate correctly (shrink support)
    el.style.height = "auto";
    // Set height based on content
    el.style.height = `${el.scrollHeight}px`;
  }, [newTask.textarea]);

  useEffect(() => {
    let id = keydownedTextareaIdRef.current;
    if (!id) return;
    const el = textareaRefs.current[id];
    // console.log(el);
    if (!el) return;
    // Reset height to recalculate correctly (shrink support)
    el.style.height = "auto";
    // Set height based on content
    el.style.height = `${el.scrollHeight}px`;
  }, [newTask.textarea]);

  return (
    <form
      name="newTaskForm"
      onSubmit={handleSubmit}
      className=" relative mx-8 my-5 text-base bg-gray-100 text-gray-950 p-10 rounded-2xl min-h-3/4 "
    >
      <textarea
        id={"1"}
        ref={newTaskTitleRefs}
        name="title"
        value={newTask.title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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

      {newTask.textarea.map((field) => (
        <TaskFieldPieces
          handleTextarea={handleTextarea}
          handleKeyDown={handleKeyDown}
          // onInput={handleInput}
          value={field.value}
          key={field.id}
          id={field.id}
          handleInput={handleInput}
          ref={(el) => {
            if (el) textareaRefs.current[field.id] = el;
          }}
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
          <option value="all" className=" mt-2.5">
            Status
          </option>
          <option value={"high"}>High</option>
          <option value={"medium"}>Medium</option>
          <option value={"low"}>Low</option>
        </select>
      </div>
    </form>
  );
}

export default NewTaskField;
