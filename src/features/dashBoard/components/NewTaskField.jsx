import { useState, useRef, useEffect } from "react";
import TaskFieldPieces from "./reusable_component/TaskFIeldPieces.JSX";
import SaveTaskButton from "./reusable_component/RemovePage";
function NewTaskField({ addTask, setMainSectionToggle, currentEditTask }) {
  //all useState Hooks
  const [taskField, setTaskField] = useState([{ id: "2" }]); //using for rendering TaskFiedPieces OR dynamic textarea and all id is using on textarea id
  const [focusId, setFocusId] = useState(null); // for textarea  focus control
  const [newTask, setNewTask] = useState({
    title: "",
    textarea: [{ id: "2", value: "" }], // dynamic, many values
    category: "all",
    status: "pending",
    priority: "medium",
  }); // new task values catcher

  // all useRef Hooks
  const textareaRefs = useRef({}); //this hooks mostly used on dynamic textarea handling
  const newTextareaIdRef = useRef("2"); //last created textarea id stored in this ref

  const keydownedTextareaIdRef = useRef(null); //last created textarea id stored in this ref

  const newTaskTitleRefs = useRef({});

  // ✅✅✅
  // ✅✅✅
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

  // ✅✅✅
  // ✅✅✅
  //this function handle  all keyboard keys action like Enter,Arrows,Backspace etc
  const handleKeyDown = (e) => {
    // console.log(id);

    const keydownedId = e.target.id;
    const keydownedTextAreaIndex = newTask.textarea.findIndex(
      (item) => item.id == keydownedId,
    );
    // console.log(keydownedTextAreaIndex);

    const keydownedTextarea = e.target;
    const keydownedTextareaValue = e.target.value;
    const cursorPositionStart = keydownedTextarea.selectionStart;
    const cursorPositionEnd = keydownedTextarea.selectionEnd;
    // console.log("cursorPositionStart", cursorPositionStart);
    // console.log("cursorPositionEnd", cursorPositionEnd);
    // console.log("keydownedTextareaValue length", keydownedTextareaValue.length);

    const zeroToPositionEnd = keydownedTextareaValue.slice(
      0,
      cursorPositionEnd,
    );

    // ✅✅✅
    // ✅✅✅

    if (e.key === "Enter" && e.target.name === "title") {
      e.preventDefault();
      if (newTask.textarea.length > 0) {
        let id = newTask.textarea[0].id;
        textareaRefs.current[id].focus();
        newTextareaIdRef.current[id];
      }
      if (newTask.textarea.length === 0) {
        const id = crypto.randomUUID(); // new textarea id

        // new Textarea id and value set on newtask textarea array
        setNewTask((prev) => {
          const newTextarea = {
            id: id,
            value: "",
          };

          const updated = [...prev.textarea];

          updated.splice(keydownedTextAreaIndex + 1, 0, newTextarea);

          return {
            ...prev,
            textarea: updated,
          };
        });
        setTaskField((prev) => [...prev, { id: id }]);

        setFocusId(id);
      }
    } else if (e.key === "Enter" && e.target.name !== "title") {
      e.preventDefault();
      const id = crypto.randomUUID(); // new textarea id

      newTextareaIdRef.current = id; // latest textarea id store in ref
      keydownedTextareaIdRef.current = keydownedId;

      // keydowned Textarea value
      const slicedKeydownedTextareaCursorInfrontValue =
        keydownedTextareaValue.slice(0, cursorPositionStart);
      // new Textarea  value
      const slicedKeydownedTextareaCursorBehindValue =
        keydownedTextareaValue.slice(cursorPositionStart);

      setNewTask((prev) => {
        const newTextarea = {
          id: id,
          value: slicedKeydownedTextareaCursorBehindValue,
        };

        const updated = prev.textarea.map((t) =>
          t.id === keydownedId
            ? { ...t, value: slicedKeydownedTextareaCursorInfrontValue }
            : t,
        );

        updated.splice(keydownedTextAreaIndex + 1, 0, newTextarea);

        return {
          ...prev,
          textarea: updated,
        };
      });

      setTaskField((prev) => [...prev, { id: id }]);

      setFocusId(id);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();

      let id = newTask.textarea[0].id;
      if (e.target.name === "title") return textareaRefs.current[id].focus();

      const nextTextareaIndex = keydownedTextAreaIndex + 1;
      let nextTextarea = newTask.textarea[nextTextareaIndex];
      if (!nextTextarea) return;
      setFocusId(nextTextarea.id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      const nextTextareaIndex = keydownedTextAreaIndex - 1;

      const nextTextarea = newTask.textarea.find(
        (value, index) => index === nextTextareaIndex,
      );

      if (!nextTextarea) return newTaskTitleRefs.current.focus();
      setFocusId(nextTextarea.id);
    } else if (e.key === "Backspace") {
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
          (value, index) => index === nextTextareaIndex,
        );

        if (!nextTextarea) return newTaskTitleRefs.current.focus();
        setFocusId(nextTextarea.id);
      }

      if (zeroToPositionEnd.length === 0) {
        const previousTextareaIndex = keydownedTextAreaIndex - 1;

        const previousTextarea = newTask.textarea[previousTextareaIndex];

        if (!previousTextarea) return keydownedTextarea;

        const previousTextareaId = previousTextarea.id;
        const previousTextareaValue = previousTextarea.value;
        const currentTextareaValue = e.target.value + " ";
        const mergedValue = previousTextareaValue.concat(currentTextareaValue);

        setNewTask((prev) => {
          const updatedTextarea = (prev.textarea ?? [])
            .map((t) =>
              t.id === previousTextareaId ? { ...t, value: mergedValue } : t,
            )
            .filter((item) => item.id !== keydownedId);
          return {
            ...prev,
            textarea: updatedTextarea,
          };
        });

        if (!previousTextarea) return newTaskTitleRefs.current.focus();

        requestAnimationFrame(() => {
          const el = textareaRefs.current[previousTextarea.id];
          if (!el) return;

          el.focus();
          el.setSelectionRange(
            previousTextareaValue.length,
            previousTextareaValue.length,
          );
        });
      }
    } else if (e.key === "ArrowRight") {
      // cursor যদি একেবারে শেষে থাকে
      if (cursorPositionEnd === keydownedTextareaValue.length) {
        const nextTextarea = newTask.textarea[keydownedTextAreaIndex + 1];

        if (!nextTextarea) {
          newTaskTitleRefs.current?.focus();
          return;
        }

        e.preventDefault();

        requestAnimationFrame(() => {
          const el = textareaRefs.current[nextTextarea.id];
          if (!el) return;

          el.focus();
          el.setSelectionRange(0, 0);
        });
      }
    } else if (e.key === "ArrowLeft") {
      // cursor যদি একেবারে শুরুতে থাকে
      if (cursorPositionStart === 0) {
        const prevTextarea = newTask.textarea[keydownedTextAreaIndex - 1];

        if (!prevTextarea) {
          newTaskTitleRefs.current?.focus();
          return;
        }

        e.preventDefault();

        requestAnimationFrame(() => {
          const el = textareaRefs.current[prevTextarea.id];
          if (!el) return;

          const end = prevTextarea.value?.length ?? 0;
          el.focus();
          el.setSelectionRange(end, end);
        });
      }
    }
  };

  // ✅✅✅
  // ✅✅✅
  //Task title ,cetagories ,status , priority etc. properties value catching function
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewTask({
      ...newTask,
      [key]: value,
    });
  };

  // ✅✅✅
  // ✅✅✅
  //dynamically create all text area Value Catching Function
  const handleTextarea = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setNewTask((prev) => ({
      ...prev,
      textarea: prev.textarea.map((t) =>
        t.id === id ? { ...t, value: value } : t,
      ),
    }));
  };

  // ✅✅✅
  // ✅✅✅

  // ✅ Normalize newline format (Windows \r\n, Old Mac \r → Unix \n)
  function normalizeText(text) {
    if (typeof text !== "string") return ""; // 🔎 safety: invalid input হলে empty string

    return text
      .replace(/\r\n/g, "\n") // 🧩 Windows newline → \n
      .replace(/\r/g, "\n"); // 🧩 Old Mac newline → \n
  }

  // ✅ Collapse multiple empty lines & prepare blocks
  function multiLineCollapse(text) {
    if (typeof text !== "string") {
      return { firstLine: "", newTextarea: [] }; // 🔎 safety fallback
    }

    const lines = text
      .split("\n") // 🧩 text কে line array বানানো
      .map((line) => line.trim()) // 🧩 প্রতিটা line clean করা
      .filter((line, index, arr) => {
        // 🧩 consecutive empty line collapse করা
        if (line !== "") return true;
        return arr[index - 1] !== "";
      });

    // const lines = text
    //   .split("\n") // 🧩 text কে line array বানানো
    //   .map((line) => line.trim()) // 🧩 প্রতিটা line clean করা
    //   .filter((line, index, arr) => {
    //     if (line !== "") return true;

    //     // প্রথম লাইনে empty হলে বাদ
    //     if (index === 0) return false;

    //     // আগের লাইন empty হলে বাদ
    //     return arr[index - 1] !== "";
    //   });
    // while (lines.length && lines[lines.length - 1] === "") {
    //   lines.pop();
    // }

    // const lines = text.filter((line, index, arr) => {
    //   if (line !== "") return true;

    //   // প্রথম লাইনে empty হলে বাদ
    //   if (index === 0) return false;

    //   // আগের লাইন empty হলে বাদ
    //   return arr[index - 1] !== "";
    // });

    if (lines.length === 0) {
      return { firstLine: "", newTextarea: [] }; // 🔎 safety: empty paste
    }

    const newTextarea = [];

    for (let i = 1; i < lines.length; i++) {
      newTextarea.push({
        id: crypto.randomUUID(), // 🧩 প্রতিটা নতুন block এর জন্য unique id
        value: lines[i],
      });
    }

    return { firstLine: lines[0], newTextarea };
  }

  // ✅ safer index finder (=== ব্যবহার করা হয়েছে)
  function textAreaIndex(id) {
    if (!id) return -1; // 🔎 safety: invalid id
    return newTask.textarea.findIndex((item) => item.id === id);
  }

  // ✅ Paste handling function (title & textarea দুই ক্ষেত্রেই কাজ করবে)
  const handleTitlePast = (e) => {
    if (!e || !e.target) return; // 🔎 safety: invalid event

    e.preventDefault(); // 🧩 default browser paste বন্ধ

    const cursorPositionStart = e.target.selectionStart ?? 0; // 🔎 safety default
    const cursorPositionEnd = e.target.selectionEnd ?? 0;

    const pastedText = e.clipboardData?.getData("text") ?? ""; // 🔎 safety clipboard
    const normalizedText = normalizeText(pastedText);
    const newTextarea = multiLineCollapse(normalizedText);

    // =========================
    // TITLE FIELD
    // =========================
    if (e.target.name === "title") {
      if (!newTextarea.firstLine) return; // 🔎 empty paste হলে কিছু করবে না

      if (e.target.value === "") {
        setNewTask((prev) => ({
          ...prev,
          title: newTextarea.firstLine, // 🧩 খালি title এ সরাসরি first line বসানো
        }));
      } else if (cursorPositionEnd !== cursorPositionStart) {
        setNewTask((prev) => ({
          ...prev,
          title:
            prev.title.slice(0, cursorPositionStart) + // 🧩 selection আগের অংশ
            newTextarea.firstLine + // 🧩 replace অংশ
            prev.title.slice(cursorPositionEnd), // 🧩 selection পরের অংশ
        }));

        requestAnimationFrame(() => {
          const el = e.target;
          if (!el) return;
          el.focus(); // 🧩 focus ফিরিয়ে আনা
          el.setSelectionRange(
            cursorPositionStart + newTextarea.firstLine.length,
            cursorPositionStart + newTextarea.firstLine.length,
          ); // 🧩 cursor নতুন text এর শেষে নেওয়া
        });
      } else {
        const beforeCursorValue = e.target.value.slice(0, cursorPositionStart);
        const afterCursorValue = e.target.value.slice(cursorPositionStart);

        setNewTask((prev) => ({
          ...prev,
          title:
            beforeCursorValue + // 🧩 cursor আগের অংশ
            newTextarea.firstLine +
            afterCursorValue, // 🧩 cursor পরের অংশ
        }));

        requestAnimationFrame(() => {
          const el = e.target;
          if (!el) return;
          el.focus();
          el.setSelectionRange(
            cursorPositionStart + newTextarea.firstLine.length,
            cursorPositionStart + newTextarea.firstLine.length,
          ); // 🧩 insert এর পরে cursor reposition
        });
      }
    }

    // =========================
    // TEXTAREA (NO SELECTION)
    // =========================
    else if (
      e.target.value !== "" &&
      e.target.name !== "title" &&
      cursorPositionStart === cursorPositionEnd
    ) {
      const pastedTextAreaValue = e.target.value;
      const beforeCursorValue = pastedTextAreaValue.slice(
        0,
        cursorPositionStart,
      );
      const afterCursorValue = pastedTextAreaValue.slice(cursorPositionStart);

      const lastTextArea = {
        id: crypto.randomUUID(),
        value: afterCursorValue, // 🧩 split এর পরে tail অংশ নতুন block
      };

      const pasedTextAreaIndex = textAreaIndex(e.target.id);
      if (pasedTextAreaIndex === -1) return; // 🔎 safety

      setNewTask((prev) => {
        let updated = [...prev.textarea]; // 🧩 array clone

        updated = updated.map((item) => {
          if (item.id === e.target.id) {
            return {
              ...item, // 🧩 object clone (immutability fix)
              value: beforeCursorValue + newTextarea.firstLine,
            };
          }
          return item;
        });

        updated.splice(pasedTextAreaIndex + 1, 0, lastTextArea);
        updated.splice(pasedTextAreaIndex + 1, 0, ...newTextarea.newTextarea);

        return { ...prev, textarea: updated };
      });
    }

    // =========================
    // TEXTAREA (WITH SELECTION)
    // =========================
    else if (
      e.target.value !== "" &&
      e.target.name !== "title" &&
      cursorPositionStart !== cursorPositionEnd
    ) {
      const pastedTextAreaValue = e.target.value;
      const beforeCursorValue = pastedTextAreaValue.slice(
        0,
        cursorPositionStart,
      );
      const afterCursorValue = pastedTextAreaValue.slice(cursorPositionEnd);

      const pasedTextAreaIndex = textAreaIndex(e.target.id);
      if (pasedTextAreaIndex === -1) return; // 🔎 safety

      if (normalizedText.split("\n").length <= 1) {
        setNewTask((prev) => {
          let updated = prev.textarea.map((item) => {
            if (item.id === e.target.id) {
              return {
                ...item, // 🧩 object clone
                value: beforeCursorValue + normalizedText + afterCursorValue, // 🧩 selection replace
              };
            }
            return item;
          });

          return { ...prev, textarea: updated };
        });
      } else {
        const lastTextArea = {
          id: crypto.randomUUID(),
          value: afterCursorValue,
        };

        setNewTask((prev) => {
          let updated = prev.textarea.map((item) => {
            if (item.id === e.target.id) {
              return {
                ...item, // 🧩 immutability fix
                value: beforeCursorValue + newTextarea.firstLine,
              };
            }
            return item;
          });

          updated.splice(pasedTextAreaIndex + 1, 0, lastTextArea);
          updated.splice(pasedTextAreaIndex + 1, 0, ...newTextarea.newTextarea);

          return { ...prev, textarea: updated };
        });
      }
    }

    // =========================
    // EMPTY TEXTAREA CASE
    // =========================
    else {
      const pasedTextAreaIndex = textAreaIndex(e.target.id);
      if (pasedTextAreaIndex === -1) return; // 🔎 safety

      setNewTask((prev) => {
        let updated = prev.textarea.map((item) => {
          if (item.id === e.target.id) {
            return {
              ...item, // 🧩 immutability fix
              value: newTextarea.firstLine,
            };
          }
          return item;
        });

        updated.splice(pasedTextAreaIndex + 1, 0, ...newTextarea.newTextarea);

        return { ...prev, textarea: updated };
      });
    }
  };

  // ✅✅✅
  // ✅✅✅

  // new task submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setMainSectionToggle((previus) => !previus);
  };

  // ✅✅✅
  // ✅✅✅

  useEffect(() => {
    if (!currentEditTask) return;

    setNewTask({
      title: currentEditTask.taskTitle,
      textarea: currentEditTask.textarea.map((item) => ({ ...item })),
      category: currentEditTask.category,
      status: currentEditTask.status,
      priority: currentEditTask.priority,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditTask?.id]);

  // ✅✅✅ this useeffect is for start task editing
  useEffect(() => {
    newTaskTitleRefs.current.focus();
  }, [taskField]);

  // ✅✅✅
  // ✅✅✅
  useEffect(() => {
    if (focusId && textareaRefs.current[focusId]) {
      textareaRefs.current[focusId].focus();
    }
  }, [taskField, focusId]);

  // ✅✅✅
  // ✅✅✅

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

  // ✅✅✅
  // ✅✅✅

  useEffect(() => {
    let id = keydownedTextareaIdRef.current;
    if (!id) return;
    const el = textareaRefs.current[id];
    if (!el) return;
    // Reset height to recalculate correctly (shrink support)
    el.style.height = "auto";
    // Set height based on content
    el.style.height = `${el.scrollHeight}px`;
  }, [newTask.textarea]);

  // ✅✅✅
  // ✅✅✅
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
        onPaste={handleTitlePast}
        type="text"
        onInput={handleInput}
        required
        // onInvalid={(e) => e.target.setCustomValidity("Fill Out Task Title")}
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
          handleTitlePast={handleTitlePast}
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
        {/* <SaveTaskButton handleSubmit={handleSubmit} /> */}

        <select
          name="category"
          value={newTask.category}
          onChange={handleChange}
          required
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
