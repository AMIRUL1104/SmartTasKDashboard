function TaskList({ allTask, handleTaskShowing }) {
  return (
    <div>
      <div className=" mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {allTask.map((task) => (
          <div
            key={task.id}
            id={task.id}
            onClick={handleTaskShowing}
            className=" bg-cyan-900 h-45 overflow-clip p-2.5 shadow-md shadow-cyan-950 rounded-lg "
          >
            <h3
              id={task.id}
              onClick={handleTaskShowing}
              className=" text-2xl font-medium"
            >
              {task.title}
            </h3>
            <p id={task.id} onClick={handleTaskShowing} className="my-2">
              {task.textarea.map((e) => {
                if (e.id === "2") {
                  const text = e.value;
                  const words = text.split(" ");
                  return words.length > 30
                    ? words.slice(0, 30).join(" ") + "  . . ."
                    : text;
                }
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
